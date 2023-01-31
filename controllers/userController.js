const { User } = require("../models/usersModel");

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

module.exports = {
  getCurrentUser,
  verifyEmail,
};