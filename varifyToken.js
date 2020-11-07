const jwt = require('jsonwebtoken');

const varify = (req, res, next) => {
    const token = req.header('auth_token');
    if (!token) return res.status(401).send('access token not found');
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('tempared access token ');
    }
}

module.exports = varify;