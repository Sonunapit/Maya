const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");

const { createMemory, queryMemory } = require("../services/vector.service");

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB per file

// frontend se aaya data URL ("data:image/png;base64,....") -> Gemini inlineData part
function toFileParts(attachments) {
  if (!Array.isArray(attachments)) return { parts: [], names: [] };
  const parts = [];
  const names = [];
  for (const f of attachments.slice(0, MAX_FILES)) {
    const m = /^data:(.+?);base64,(.+)$/.exec(f?.data || "");
    if (!m) continue;
    const [, mimeType, data] = m;
    const okType = mimeType.startsWith("image/") || mimeType === "application/pdf";
    const bytes = Math.floor((data.length * 3) / 4);
    if (!okType || bytes > MAX_FILE_BYTES) continue;
    parts.push({ inlineData: { mimeType, data } });
    names.push(String(f.name || "file").slice(0, 80));
  }
  return { parts, names };
}

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
    maxHttpBufferSize: 2e7, // 20 MB => attachments ke liye
  });

  // Authentication Middleware (cookie se JWT)
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      if (!cookies.token) {
        return next(new Error("Authentication error: No token provided"));
      }
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user._id);

    socket.on("ai-message", async (messagePayload) => {
      try {
        if (typeof messagePayload === "string") {
          messagePayload = JSON.parse(messagePayload);
        }

        const { chat, message, attachments } = messagePayload || {};
        const { parts: fileParts, names: fileNames } = toFileParts(attachments);

        // sirf file bheji ho to bhi chalega
        const prompt =
          message?.trim() || (fileParts.length ? "Please analyse the attached file(s)." : "");

        if (!chat || !prompt) {
          return socket.emit("ai-error", { message: "Chat ID and message are required" });
        }

        // 1. User message DB me (file ka sirf naam save hota hai, data nahi)
        const savedMessage = await messageModel.create({
          chat,
          user: socket.user._id,
          content: fileNames.length ? `${prompt}\n\n[Attached: ${fileNames.join(", ")}]` : prompt,
          role: "user",
        });

        // 2-3. Embedding + Pinecone
        const vectors = await aiService.generateVector(prompt);
        await createMemory({
          vectors,
          messageId: savedMessage._id.toString(),
          metadata: {
            chat: chat.toString(),
            user: socket.user._id.toString(),
            content: prompt,
          },
        });

        // 4. Relevant memories
        const memories = await queryMemory({
          queryVector: vectors,
          limit: 5,
          metadata: {
            chat: chat.toString(),
            user: socket.user._id.toString(),
          },
        });

        // 5. Last 20 messages
        const chatHistory = await messageModel
          .find({ chat, user: socket.user._id })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();
        chatHistory.reverse();

        // 6. AI context
        const memoryContext = memories
          .map((item) => item.metadata?.content)
          .filter(Boolean)
          .join("\n");

        const contents = [];

        if (memoryContext) {
          contents.push({
            role: "user",
            parts: [
              {
                text:
                  "Relevant previous conversation memories:\n" +
                  memoryContext +
                  "\nUse these memories when relevant.",
              },
            ],
          });
        }

        contents.push(
          ...chatHistory.map((item) => ({
            role: item.role === "model" ? "model" : "user",
            parts: [{ text: item.content }],
          }))
        );

        // files sirf current (sabse naye) user message ke saath jaati hain
        if (fileParts.length) {
          contents[contents.length - 1].parts.push(...fileParts);
        }

        // 7. AI response
        const response = await aiService.generateResponse(contents);

        // 8. Save AI response
        const savedResponse = await messageModel.create({
          chat,
          user: socket.user._id,
          content: response,
          role: "model",
        });

        // 9. Frontend ko bhejo
        socket.emit("ai-response", {
          content: response,
          chat,
          messageId: savedResponse._id,
        });
      } catch (error) {
        console.error("AI Error:", error);
        socket.emit("ai-error", {
          message: error.message || "Something went wrong while generating AI response",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user._id);
    });
  });
}

module.exports = initSocketServer;