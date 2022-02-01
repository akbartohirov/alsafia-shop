const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const asyncHandler = require("express-async-handler");
require("dotenv").config({ path: "../../.env" });

const auth = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded.id);
        } catch (e) {
            console.log(e);
            res.status(401);
            throw new Error("Unauthorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("You are not logged in");
    }

    next();
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("You are not authorized as an admin!");
    }
};

module.exports = { auth, admin };
