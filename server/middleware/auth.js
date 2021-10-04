const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const parsedToken = JSON.parse(token);

    if (!parsedToken) return res.status(401).json({ message: "Auth Error" });

    try {
        const decoded = jwt.verify(parsedToken, ":7HK2ATab_", 'HS256');
        req.user = decoded.userId;
        next();
    } catch (e) {
        res.status(500).send({ 
            message: "Invalid Token",
            status: 500
        });
    }
};