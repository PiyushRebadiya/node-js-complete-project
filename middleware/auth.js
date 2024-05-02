const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    // Use cookie-parser middleware to parse cookies

    // Retrieve token from the 'token' cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
