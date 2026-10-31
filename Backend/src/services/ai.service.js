
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// MAYA System Instruction
const MAYA_SYSTEM_INSTRUCTION = `
You are MAYA - My AI, Your Assistant.

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

// Generate AI Response
async function generateResponse(content) {
  try {
    console.log(
      "MAYA Prompt:",
      JSON.stringify(content, null, 2)
    );

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: content,
      config: {
        systemInstruction: MAYA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const aiResponse = response.text;

    if (!aiResponse) {
      throw new Error("MAYA returned an empty response");
    }

    console.log("MAYA Response:", aiResponse);

    return aiResponse;

  } catch (error) {
    console.error("MAYA Response Error:", error);
    throw error;
  }
}

// Generate Embedding Vector
async function generateVector(content) {
  try {
    if (!content || typeof content !== "string") {
      throw new Error(
        "Valid text content is required for embedding"
      );
    }

    console.log("Generating Vector:", content);

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

    console.log(
      "Generated vector dimensions:",
      vector.length
    );

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
