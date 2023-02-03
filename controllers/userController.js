const { User } = require("../models/usersModel");
const { sendMail } = require("../helpers/index");

async function getCurrentUser(req, res, next) {
  try {
    const { user } = req;
    const { email, subscription } = user;

    return res.status(200).json({
      email,
      subscription,
    });
  
  } catch (error) {
    next(error);
  }   
}

async function verifyEmail(req, res, next) {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({
    verificationToken: verificationToken,
    });

    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
    
    return res.status(200).json({ message: 'Verification successful' });

  } catch (error) {
    next(error);
  }
}

async function repeatVerification(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({
    email,
  });
    if (!user.verify) {
      await sendMail({
      to: email,
      subject: "Please confirm your email!",
      html: `<a href="localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
      });

    return res.status(200).json({ message: 'Verification email sent' });  
    }

    return res.status(400).json({ message: 'Verification has already been passed' });
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentUser,
  verifyEmail,
  repeatVerification,
};