const mongoose = require("mongoose");

const ToDo = mongoose.model("ToDo", { title: String, done: Boolean });

module.exports = ToDo;
