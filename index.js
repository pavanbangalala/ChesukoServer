const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();
app.use(helmet());
app.use(express.json());
const User = require("./models/Authentication");
const AuthRouter = require("./routes/Authentication");
const ToDoRouter = require("./routes/ToDos");

mongoose
  .connect(
    "mongodb+srv://pawanb:YHu86xyFUlfFzV4r@cluster0.sgu5aqz.mongodb.net/Chesuko?retryWrites=true&w=majority"
  )
  .then((response) => {
    console.log("connection to db succesful");
    app.listen("0.0.0.0", () => {
      console.log("listening to port 8000");
    });
  })
  .catch((error) => console.log("could not connect to database"));

app.use("/api/auth", AuthRouter);
app.use("/api/todos", ToDoRouter);
