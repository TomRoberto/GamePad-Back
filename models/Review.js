const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  grade: number,
  gameSlug: String,
  gameId: String,
});

module.exports = Review;
