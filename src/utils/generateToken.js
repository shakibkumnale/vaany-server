// src/utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d", // Token expiration (adjust as needed)
    });
};

module.exports = generateToken;
