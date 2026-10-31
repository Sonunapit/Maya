const express = require('express')
const authMiddleware = require("../middlewares/auth.middleware")
const chatController = require("../controllers/chat.controller")

const router = express.Router()

/* POST /api/chat/ */
router.post('/', authMiddleware.authUser, chatController.createChat)

/* GET /api/chat/ -> sidebar history */
router.get('/', authMiddleware.authUser, chatController.getChats)

/* GET /api/chat/:id/messages */
router.get('/:id/messages', authMiddleware.authUser, chatController.getMessages)

/* DELETE /api/chat/:id */
router.delete('/:id', authMiddleware.authUser, chatController.deleteChat)

module.exports = router;