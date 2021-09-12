const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  favoriteGames: Array,
  reviews: [{ ref: "Review", type: mongoose.Schema.Types.ObjectId }],
});

module.exports = User;
