const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/users/:userId", userController.getUserById)
router.get("/matches/:userId", userController.getMatches)
router.post("/like-profile", userController.likeProfile)
router.post("/create-match", userController.createMatch)
router.get(
    "/received-likes/:userId",
    userController.getReceivedLikes
)

module.exports = router
