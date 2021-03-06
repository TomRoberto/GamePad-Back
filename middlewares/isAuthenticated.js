const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const user = await User.findOne({ token: token }).select(
        "favoriteGames email username token reviews _id"
      );
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized, didnt find user" });
        console.log("pb");
      }
    } else {
      res.status(401).json({ message: "Unauthorized, bad authorisation" });
      console.log("pb");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("pb");
  }
};

module.exports = isAuthenticated;
