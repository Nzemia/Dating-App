const http = require("http")
const app = require("./app")
const connectDB = require("./config/db")
const socketio = require("socket.io")

// Connect to MongoDB
connectDB()

// Create HTTP server
const server = http.createServer(app)

// Set up Socket.IO
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

// Initialize Socket.IO event handlers
require("./socket")(io)

// Start server
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
