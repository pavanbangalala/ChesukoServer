const mongoose = require("mongoose");

const ToDoSchema = mongoose.Schema({
  text: {
    type: String,
    min: 5,
    max: 200,
    required: true,
  },
  postedBy: {
    type: String,
    min: 5,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
