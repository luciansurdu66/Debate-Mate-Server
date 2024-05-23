const jwt = require("jsonwebtoken");
const secret = "mysecret";

const verifyRole = (role) => {
    return (req, res, next) => {
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ error: "Access denied" });
        }

        try {
            const decoded = jwt.verify(token, secret);
            if (decoded.role !== role) {
                return res.status(403).json({ error: "Unauthorized" });
            }
            next();
        } catch (error) {
            res.status(400).json({ error: "Invalid token" });
        }
    };
};

module.exports = verifyRole;
