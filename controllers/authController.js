const { User } = require("../models/usersModel");

async function register(req, res, next) {
 
  try {
    const { email, password } = req.body;

    const newUser = await User.create({
      email,
      password,
    });

    return res.status(201).json({ user: newUser });

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