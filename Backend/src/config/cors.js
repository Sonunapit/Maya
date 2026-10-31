const allowedOrigins = [
  "http://localhost:5173",
  "https://maya-mu-ecru.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean)

module.exports = allowedOrigins