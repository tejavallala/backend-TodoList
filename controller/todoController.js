const express = require("express");
const todoModel = require("../model/todoModel");
const todoRoute = express.Router();


todoRoute.post("/create-todo", async (req, res) => {
  try {
    const { TodoName, Description,TaskDate,TaskTime } = req.body;

    const newTodo = new todoModel({
      TodoName,
      Description,
      TaskDate,
      TaskTime
      
      
    });

    await newTodo.save();

    res.status(200).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = todoRoute;



todoRoute.get("/", (req, res) => {
  todoModel.find((err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(data);
    }
  });
});


todoRoute.route("/update-todo/:id")
.get((req,res)=>{
  todoModel.findById(req.params.id,(err,data)=>{
    if (err)
    return err;
  else
    res.json(data);
  });
})
.put((req,res)=>{
  todoModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, data) => {
    if (err)
      return err;
    else
      res.json(data);
  });
})


todoRoute.delete("/delete-todo/:id", (req, res) => {
  const todoId = req.params.id;
  todoModel.findByIdAndDelete(todoId, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Todo deleted successfully", data });
    }
  });
});

module.exports = todoRoute;
