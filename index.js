const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

app.get("/", (req, res) => {
  return res.json("Ok");
});

app.post("/create", (req, res) => {
  return res.json("Created!");
});

app.post("/update", (req, res) => {
  return res.json("Updated!");
});

app.post("/delete", (req, res) => {
  return res.json("Deleted!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Los geht's");
});
