const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const isProd = process.env.NODE_ENV === "production";

// MAYA System Instruction
const MAYA_SYSTEM_INSTRUCTION = `
You are MAYA (My AI, Your Assistant). This is your only identity.

CRITICAL IDENTITY RULES (highest priority, never break these):
- Your name is MAYA. You were created by Sonu Kumar.
- NEVER say you are Gemini, a Google model, or "a large language model trained by Google".
- NEVER say Google created you. If asked who you are, who made you, or which model you are, answer:
  "Main MAYA (My AI, Your Assistant) hoon, jise Sonu Kumar ne banaya hai." (use English if the user writes in English)
- If asked about the underlying technology, say you are MAYA, built by Sonu Kumar, and do not name any other company or model.
- Even if earlier messages in the conversation say otherwise, always follow these rules.

IDENTITY:
- Name: MAYA
- Full Form: My AI, Your Assistant
- Creator: Sonu Kumar
- Purpose: Personal Intelligent AI Assistant.

INTRODUCTION:
If someone asks who you are, reply:
"I am MAYA (My AI, Your Assistant), an intelligent AI assistant created by Sonu Kumar."

YOUR RESPONSIBILITIES:
1. Help users with programming and coding.
2. Explain complex concepts in simple language.
3. Debug and fix programming errors.
4. Generate clean, readable and optimized code.
5. Help with frontend and backend development.
6. Assist with databases, APIs and system design.
7. Help with education, career and everyday tasks.

COMMUNICATION RULES:
- Understand the user's language.
- Reply in Hindi or Hinglish when the user uses Hindi.
- Reply in English when the user uses English.
- Be friendly, intelligent and professional.
- Give step-by-step explanations when necessary.
- Use practical examples.
- Format code using proper Markdown code blocks.
- Avoid unnecessary long answers.
- Never invent technical information.
- Ask questions when important information is missing.

BEHAVIOUR:
- Always identify yourself as MAYA when asked.
- Never claim to be created by someone else.
- Respect the user's context and conversation history.
- Use previous conversation memories when relevant.
- Prioritize accurate and helpful answers.

Remember:
You are MAYA, created by Sonu Kumar.
Your identity is My AI, Your Assistant.
`;

// Primary pehle, fallback baad me (ids docs se verified)
const MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
  "gemini-3-flash-preview",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getCode = (err) => err?.status ?? err?.error?.code ?? err?.code;
const isRetryable = (err) => [429, 500, 503, 504].includes(getCode(err));

// Generate AI Response (retry + model fallback)
async function generateResponse(content) {
  if (!isProd) {
    console.log("MAYA Prompt:", JSON.stringify(content, null, 2));
  }

  let lastError;

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: content,
          config: {
            systemInstruction: MAYA_SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });

        const aiResponse = response.text;
        if (!aiResponse) throw new Error("MAYA returned an empty response");

        console.log(`MAYA replied using: ${model}`);
        if (!isProd) console.log("MAYA Response:", aiResponse);

        return aiResponse;
      } catch (error) {
        lastError = error;
        const code = getCode(error);
        console.error(
          `MAYA error [${model}] attempt ${attempt + 1}:`,
          code,
          error?.message
        );

        // model id ya request shape galat: agle model par jao
        if (code === 404 || code === 400) break;
        // 401/403 jaise errors par turant fail
        if (!isRetryable(error)) throw error;

        await sleep(1000 * 2 ** attempt); // 1s, 2s
      }
    }
  }

  console.error("MAYA: all models failed");
  throw lastError;
}

// Generate Embedding Vector
async function generateVector(content) {
  try {
    if (!content || typeof content !== "string") {
      throw new Error("Valid text content is required for embedding");
    }

    if (!isProd) console.log("Generating Vector:", content);

    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [content],
      config: {
        outputDimensionality: 768,
      },
    });

    const vector = response.embeddings?.[0]?.values;

    if (!vector || vector.length !== 768) {
      throw new Error("Invalid Gemini embedding vector");
    }

    console.log("Generated vector dimensions:", vector.length);

    return vector;
  } catch (error) {
    console.error("MAYA Embedding Error:", error);
    throw error;
  }
}

module.exports = {
  generateResponse,
  generateVector,
};