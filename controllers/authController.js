const { User } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendMail } = require("../helpers/index");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarURL = gravatar.url(email);
    const verificationToken = v4();

    const newUser = await User.create({
      avatarURL,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await sendMail({
    to: email,
    subject: "Please confirm your email!",
    html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });

    return res.status(201).json({ user: { avatarURL, email, subscription: newUser.subscription } });

  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
       return res.status(409).json({
         message: "User with this email already exists",
    })
    }
    next(error);
  }   
}

async function login(req, res, next) {
  try {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });
  if (!storedUser) {
    return res.status(401).json({ message: 'Email or password is wrong' });
    }

  if (!storedUser.verify) {
    return res.status(401).json({ message: 'Email is not verified! Please check your mail box!' });
  }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    
    return res.status(200).json({
      token: token,
      user: { email, subscription: storedUser.subscription }
    })

  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    return res.status(204).send();

  } catch (error) {
    next(error);
  }   
}

module.exports = {
  register,
  login,
  logout,
};