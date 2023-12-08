const router = require("express").Router();
const ToDo = require("../models/ToDo");

router.get("/all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await ToDo.find({ postedBy: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { text, postedBy } = req.body;
    const todo = new ToDo({ postedBy: postedBy, text: text, completed: false });
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const todo = await ToDo.findOne({ _id: id });
    if (todo) {
      const item = await todo.updateOne({ text: text });
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "todo item not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/complete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await ToDo.findOne({ _id: id });
    if (todo) {
      const item = await ToDo.updateOne({ completed: !todo.completed });
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(400).json({ error: error });
      }
    } else {
      res.status(404).json({ error: error });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await ToDo.findOne({ _id: id });
    todo && (await ToDo.deleteOne({ _id: id }));
    res.status(200).json({ message: "deleted todo succesfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
