const Message = require("../models/messageModel")

// Save a new chat message.
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        console.error("Error sending message:", error)
        res.status(500).json({
            message: "Error sending message"
        })
    }
}

// Get messages between two users.
exports.getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.query
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ]
        }).populate("senderId", "_id firstName")
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching messages",
            error
        })
    }
}
