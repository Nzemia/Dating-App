// controllers/authController.js
const User = require("../models/userModel")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const userData = req.body
        const newUser = new User(userData)
        await newUser.save()

        const secretKey = crypto
            .randomBytes(32)
            .toString("hex")
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            secretKey,
            { expiresIn: "1d" }
        )

        res.status(201).json({
            token,
            message: "User created successfully"
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({
            error: "Error creating user"
        })
    }
}

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        const secretKey = crypto
            .randomBytes(32)
            .toString("hex")
        const token = jwt.sign(
            { userId: user._id },
            secretKey,
            { expiresIn: "1d" }
        )
        res.status(200).json({ token })
    } catch (error) {
        console.error("Login failed:", error)
        res.status(500).json({ message: "Login failed" })
    }
}
