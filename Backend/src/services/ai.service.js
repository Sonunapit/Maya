const { GoogleGenAI } = require ("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateResponse(content) {
    console.log("AI Prompt:", content);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: content 
  });
  return response.text;
}

module.exports = {generateResponse}

