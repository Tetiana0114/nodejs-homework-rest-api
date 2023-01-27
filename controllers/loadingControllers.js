const path = require("path");
const fs = require("fs/promises");

async function uploadAvatar(req, res, next) {
  try {
    const { filename } = req.file;
    const tmpPath = path.resolve(__dirname, "../tmp", filename);
    const publicPath = path.resolve(__dirname, "../public", filename);
      await fs.rename(tmpPath, publicPath);
    
      return res.json({
          ok: true,
      })

  } catch (error) {
     await fs.unlink(tmpPath);
    next(error);
  }   
}

module.exports = {
    uploadAvatar,
};