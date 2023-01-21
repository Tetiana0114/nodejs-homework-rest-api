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

module.exports = {
    getCurrentUser,
};