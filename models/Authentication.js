const mongoose = require("mongoose");

const UserSchma = mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 30,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 12,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchma);
