const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationPreferencesSchema = new Schema({
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    frequency: { type: String, default: "immediately" }
})

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    hometown: { type: String, required: true },
    datingPreferences: [{ type: String }],
    lookingFor: { type: String, required: true },
    imageUrls: [{ type: String }],
    prompts: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    ],
    likedProfiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    receivedLikes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            image: { type: String, required: true },
            comment: { type: String }
        }
    ],
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastLogin: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
    visibility: {
        type: String,
        enum: ["public", "hidden"],
        default: "public"
    },
    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    notificationPreferences: notificationPreferencesSchema
})

module.exports = mongoose.model("User", userSchema)
