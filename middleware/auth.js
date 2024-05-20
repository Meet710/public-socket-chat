const USER = require("../model/user");

exports.isAuth = async (req, res, next) => {
  try {
    const username = req.session.username;
    if (!username) {
      return res.redirect("/");
    }
    const user = await USER.findOne({ username: username });
    if (!user) {
      return res.redirect("/");
      }
      
    next();
  } catch (error) { 
    next(error);
    }
    
};
