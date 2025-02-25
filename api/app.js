const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

// Mount routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

module.exports = app
