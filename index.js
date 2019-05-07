const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/to-do-list",
  {
    useNewUrlParser: true
  }
);

const ToDo = mongoose.model("ToDo", { title: String, done: Boolean });

app.get("/", async (req, res) => {
  try {
    const todos = await ToDo.find();
    await todos.save();

    return res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json("Couldn't find your to do list.");
  }
});

app.post("/create", async (req, res) => {
  try {
    const toDo = new ToDo({
      title: req.body.title,
      done: false
    });

    await toDo.save();
    return res.json(`You now have "${req.body.title}" to do!`);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/update", async (req, res) => {
  try {
    const toDo = await ToDo.findById(req.body.id);

    if (toDo.done) {
      toDo.done = false;
    } else {
      toDo.done = true;
    }

    await toDo.save();

    return res.json("Updated!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const toDo = await ToDo.findById(req.body.id);

    await toDo.remove();

    return res.json(`Deleted! You don't have to do "${toDo.title}" anymore`);
  } catch (error) {
    console.log(error);
    res.status(400).json("Error");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Los geht's");
});
