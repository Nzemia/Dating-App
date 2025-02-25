const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Message", messageSchema)
