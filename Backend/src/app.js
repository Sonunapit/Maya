const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const allowedOrigins = require('./config/cors')

/* Routes */
const authRoutes = require('./routes/auth.routes')
const chatRoutes = require('./routes/chat.routes')

const app = express()

// Render proxy ke peeche hai, secure cookies ke liye zaroori
app.set("trust proxy", 1)

app.use(cors({
  origin: (origin, callback) => {
    // origin undefined => Postman / server-to-server, allow
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}))

/* Using Middlewares */
app.use(express.json())
app.use(cookieParser())

/* Using Routes */
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

module.exports = app