const jwt = require('jsonwebtoken')
const configs = require("../config/config");

const authUser = (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) return res.status(404).send("Token not found")
        let verifyUser = jwt.verify(token, process.env.JWT_SECRET || configs.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).send("You have been logged out please log in again");
    }
};

module.exports = authUser;