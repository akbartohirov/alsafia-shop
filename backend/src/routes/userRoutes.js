const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    getUserProfile,
    getUserProfileById,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUserById,
} = require("../controllers/userController");
const { auth, admin } = require("../middleware/authMiddleware");

//auth
router.post("/login", loginUser).post("/register", registerUser);

//user data
router
    .get("/", auth, admin, getUsers)
    .get("/profile", auth, getUserProfile)
    .get("/:id", auth, getUserProfileById)
    .put("/profile", auth, updateUserProfile)
    .put("/:id", auth, admin, updateUserById)
    .delete("/:id", auth, admin, deleteUser);

module.exports = router;
