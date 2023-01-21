const jwt = require("jsonwebtoken");
const { User } = require("../models/usersModel");


async function authValidation(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
        return res.status(401).json({ message: "Not authorized" });
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
             return res.status(401).json({ message: "Not authorized" });
        }

        req.user = user;
        next();
         
  } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Not authorized" });
        }
        next(error);
    }
};

module.exports = {
  authValidation,
};