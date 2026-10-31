const chatModel = require('../models/chat.model')
const messageModel = require('../models/message.model') // path aur naam apne project ke hisaab se

async function createChat(req, res) {
  const { title } = req.body
  const user = req.user;

  const chat = await chatModel.create({
    user: user._id,
    title
  })
  res.status(201).json({
    message: "Chat created successfully ",
    chat: {
        _id: chat._id,
        title: chat.title,
        lastActivity: chat.lastActivity,
        user: chat.user
    }
  })
}

/* GET /api/chat -> sidebar history */
async function getChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user._id })
      .sort({ lastActivity: -1 })
      .select("_id title lastActivity user")
    res.status(200).json({ chats })
  } catch (e) {
    res.status(500).json({ message: "Couldn't load chats" })
  }
}

/* GET /api/chat/:id/messages */
async function getMessages(req, res) {
  try {
    const chat = await chatModel.findOne({ _id: req.params.id, user: req.user._id })
    if (!chat) return res.status(404).json({ message: "Chat not found" })
    const messages = await messageModel.find({ chat: chat._id }).sort({ createdAt: 1 })
    res.status(200).json({ messages })
  } catch (e) {
    res.status(500).json({ message: "Couldn't load messages" })
  }
}

/* DELETE /api/chat/:id */
async function deleteChat(req, res) {
  try {
    const chat = await chatModel.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!chat) return res.status(404).json({ message: "Chat not found" })
    await messageModel.deleteMany({ chat: chat._id })
    res.status(200).json({ message: "Chat deleted" })
  } catch (e) {
    res.status(500).json({ message: "Couldn't delete chat" })
  }
}

module.exports = { createChat, getChats, getMessages, deleteChat }