const mongoose = require("mongoose");

async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", err);
  }
}
module.exports = connectdb