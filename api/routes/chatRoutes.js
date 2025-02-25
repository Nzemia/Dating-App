const express = require("express")
const router = express.Router()
const chatController = require("../controllers/chatController")

router.post("/send-message", chatController.sendMessage)
router.get("/messages", chatController.getMessages)

module.exports = router
