const express = require("express");
const router = express.Router();

const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/favorite/get", isAuthenticated, async (req, res) => {
  const user = req.user;

  res.status(200).json({ favorite: user.favoriteGames });
  console.log("route");
});
router.post("/favorite/create", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;

    user.favoriteGames.push(req.fields.slug);
    await user.save();
    res.status(200).json({ message: "Favorite has been saved 🚀" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
