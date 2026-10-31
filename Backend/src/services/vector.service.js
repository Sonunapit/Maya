
const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const mayaIndex = pc.Index("maya");

async function createMemory({ vectors, metadata, messageId }) {
  try {
    if (!vectors || !Array.isArray(vectors) || vectors.length === 0) {
      throw new Error("Invalid or empty embedding vector");
    }

    if (!messageId) {
      throw new Error("Message ID is required");
    }

    const record = {
      id: String(messageId),
      values: vectors,
      metadata,
    };

    console.log("Pinecone record ID:", record.id);
    console.log("Vector dimensions:", vectors.length);

    await mayaIndex.upsert({
      records: [record],
    });

    console.log("Memory created successfully");

  } catch (error) {
    console.error("Create Memory Error:", error);
    throw error;
  }
}

async function queryMemory({
  queryVector,
  limit = 5,
  metadata,
}) {
  try {
    const data = await mayaIndex.query({
      vector: queryVector,
      topK: limit,
      ...(metadata ? { filter: metadata } : {}),
      includeMetadata: true,
    });

    return data.matches;

  } catch (error) {
    console.error("Query Memory Error:", error);
    throw error;
  }
}

module.exports = {
  createMemory,
  queryMemory,
};
