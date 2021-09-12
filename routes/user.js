const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  //   console.log("route");
  const { email, password, username } = req.fields;
  try {
    const verif = await User.findOne({ email: email });
    if (!verif) {
      if (password && username && email) {
        const salt = uid2(16);
        const hash = SHA256(salt + password).toString(encBase64);
        const token = uid2(64);
        const newUser = new User({
          email,
          username,
          token,
          hash,
          salt,
        });
        await newUser.save();
        res.status(200).json({
          id: newUser._id,
          token,
          username,
        });
      } else {
        res
          .status(400)
          .json({ error: { message: "You have to fill all fields." } });
      }
    } else {
      res.status(409).json({
        error: { message: "This email is already used by a user." },
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.fields;
  try {
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const newHash = SHA256(user.salt + password).toString(encBase64);
        if (newHash === user.hash) {
          res.status(200).json({
            id: user._id,
            username: user.username,
            token: user.token,
          });
          console.log("ok");
        } else {
          res
            .status(401)
            .json({ error: { message: "Wrong email or password" } });
        }
      } else {
        res.status(400).json({ error: { message: "Wrong email or pasword" } });
      }
    } else {
      res
        .status(400)
        .json({ error: { message: "You have to fill all fields" } });
    }
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
