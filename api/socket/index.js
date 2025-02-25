const Message = require("../models/messageModel")

module.exports = io => {
    io.on("connection", socket => {
        console.log("A user connected")

        socket.on("sendMessage", async data => {
            try {
                const { senderId, receiverId, message } =
                    data
                const newMessage = new Message({
                    senderId,
                    receiverId,
                    message
                })
                await newMessage.save()
                io.to(receiverId).emit(
                    "receiveMessage",
                    newMessage
                )
            } catch (error) {
                console.error(
                    "Error handling message:",
                    error
                )
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected")
        })
    })
}
