const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../../.env" });

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const matchPass = await user.matchPassword(password);

    console.log(matchPass);

    if (user && matchPass) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.send({ user, token });
    } else {
        res.status(404);
        throw new Error("Invalid credential");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.status(200).json(user);
    } else {
        throw new Error("User not found");
    }
});

const getUserProfileById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    } else {
        res.status(200).json(user);
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } else {
        throw new Error("User not found");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if (!users) {
        res.status(404);
        throw new Error("There is not any user!");
    } else {
        res.status(200).json(users);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("There is not any user!");
    } else {
        await user.remove();
        res.json({ message: "User has been successfully deleted!" });
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } else {
        throw new Error("User not found");
    }
});

module.exports = {
    loginUser,
    getUserProfile,
    registerUser,
    getUserProfileById,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUserById,
};
