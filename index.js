const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

const ToDo = mongoose.model("ToDo", { title: String, done: Boolean });

app.get("/", (req, res) => {
  try {
    return res.json("Ok");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/create", async (req, res) => {
  try {
    const toDo = new ToDo({
      title: req.body.title,
      done: false
    });

    await toDo.Do.save();
    return res.json(`You know have ${req.body.title} to do!`);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/update", (req, res) => {
  try {
    return res.json("Updated!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/delete", (req, res) => {
  try {
    return res.json("Deleted!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Los geht's");
});
