const User = require("../models/user")
const jwt = require('jsonwebtoken');
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            // throw new Error("Authentication failed: No token provided.");
            // 401 --> yoy're not authorized
           return res.status(401).send("please login")
        }

        // Validate the token
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user with _id from the payload
        const user = await User.findById(decodedPayload._id);
        if (!user) {
            throw new Error("Authentication failed: User not found.");
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next handler

    } catch (err) {
        res.status(401).send("error" + err.message);
    }
};
module.exports = {
    userAuth
}