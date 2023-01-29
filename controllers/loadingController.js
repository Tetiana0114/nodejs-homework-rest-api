const path = require("path");
const { User } = require("../models/usersModel");
const Jimp = require("jimp");


async function updateAvatar(req, res, next) {
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const publicPath = path.resolve(__dirname, '../public/avatars',  filename);

  try {
    Jimp.read(tmpPath, (err, file) => {
      if (err) throw err;
      file
        .resize(250, 250)
        .quality(60)
        .write(publicPath)
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: `/avatars/${filename} ` },
      { new: true }
    );

    res.status(200).json({ user: { email:updatedUser.email, avatarURL: updatedUser.avatarURL } });

  } catch (error) {
     next(error);
  }
}
  
module.exports = {
    updateAvatar,
};