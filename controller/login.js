const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const cookie = require('cookie');

dotenv.config();

const loginHandler = async (req, res) => {
    try {
        const { name, pass } = req.query;
        if (!name || !pass) {
            return res.status(400).send('Name and pass parameters are required and must not be null or undefined');
        }

        const options = { expiresIn: '15s' }; // Token expiration time

        const token = jwt.sign({ name, pass }, process.env.SECRET_KEY, options);

        // Set the token in a cookie
        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 15 * 1000, // 15 seconds
            sameSite: 'strict', // Or 'none' if using cross-origin requests
            secure: process.env.NODE_ENV === 'production' // Set to true in production
        }));

        res.status(200).send({
            status: true,
            token,
            name,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    loginHandler
}
