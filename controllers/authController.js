const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");

async function register(req, res, next) {
 
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ user: { email, subscription: newUser.subscription } });

  } catch (error) {

    if (error.message.includes("E11000 duplicate key error")) {
       return res.status(409).json({
         message: "User with this email already exists",
    })
    }

    next(error);
  }   
}

module.exports = {
  register,
};