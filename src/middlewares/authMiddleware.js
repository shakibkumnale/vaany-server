// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
//MO tanNGO_Uiya0211TRI="mongodb+srv://shakibkumnali:IDwrLxe6xvVVMMw@cluster0.18kgu.mongodb.net/Vaany?retryWrites=true&w=majority&appName=Cluster0"

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};

module.exports = protect;
