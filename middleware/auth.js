const jwt = require("jsonwebtoken");
const config = process.env;
const cookie = require('cookie');

function generateToken(payload, res) {
    const options = { expiresIn: '15s' }; // Token expiration time

    const token = jwt.sign(payload, process.env.SECRET_KEY, options);

    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 15 * 1000, // 15 seconds
        sameSite: 'strict', // Or 'none' if using cross-origin requests
        secure: process.env.NODE_ENV === 'production' // Set to true in production
    }));

    return token
}

const verifyToken = (req, res, next) => {
    // Retrieve token from the 'token' cookie
    let token = req.cookies.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        const { name, pass } = decoded
        if (decoded.exp - 10 <= Date.now() / 1000) {
            token = generateToken({ name , pass }, res); // Example: New token expires in 1 hour
        }
        req.user = decoded;
    } catch (err) {
        return res.status(401).send(err?.message || "Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
