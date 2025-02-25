const User = require("../models/userModel")

//Fetch user by id
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
        if (!user)
            return res
                .status(404)
                .json({ message: "User not found" })
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user details"
        })
    }
}

// Get match users
exports.getMatches = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).populate(
            "matches",
            "firstName imageUrls"
        )
        if (!user)
            return res
                .status(404)
                .json({ message: "User not found" })
        res.status(200).json({ matches: user.matches })
    } catch (error) {
        console.error("Error getting matches:", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Like a profile
exports.likeProfile = async (req, res) => {
    try {
        const { userId, likedUserId, image, comment } =
            req.body
        await User.findByIdAndUpdate(likedUserId, {
            $push: {
                receivedLikes: { userId, image, comment }
            }
        })
        await User.findByIdAndUpdate(userId, {
            $push: { likedProfiles: likedUserId }
        })
        res.status(200).json({
            message: "Profile liked successfully"
        })
    } catch (error) {
        console.error("Error liking profile:", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Create a match between two users.
exports.createMatch = async (req, res) => {
    try {
        const { currentUserId, selectedUserId } = req.body
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { matches: currentUserId },
            $pull: { likedProfiles: currentUserId }
        })
        await User.findByIdAndUpdate(currentUserId, {
            $push: { matches: selectedUserId }
        })
        await User.findByIdAndUpdate(currentUserId, {
            $pull: {
                receivedLikes: { userId: selectedUserId }
            }
        })
        res.status(200).json({
            message: "Match created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating a match",
            error
        })
    }
}

// Fetch received likes for a user.
exports.getReceivedLikes = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)
            .populate(
                "receivedLikes.userId",
                "firstName imageUrls prompts"
            )
            .select("receivedLikes")
        res.status(200).json({
            receivedLikes: user.receivedLikes
        })
    } catch (error) {
        console.error(
            "Error fetching received likes:",
            error
        )
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
