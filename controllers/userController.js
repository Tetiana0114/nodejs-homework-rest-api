const { User } = require("../models/usersModel");

async function getCurrentUser(req, res, next) {
 
    try {
///

    return res.status(200).json({ ok: true });
  
  } catch (error) {
 
    next(error);
  }   
}

module.exports = {
    getCurrentUser,
};