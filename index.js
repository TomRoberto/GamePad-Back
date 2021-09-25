const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const favoriteRoutes = require("./routes/favorite");
app.use(favoriteRoutes);

const reviewRoutes = require("./routes/review");
app.use(reviewRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome on this server ! 😎",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist 🧐" });
});
app.listen(process.env.PORT || 4000, () => {
  console.log("🚚 Server Started 🚀");
});
