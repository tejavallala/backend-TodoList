const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  TodoName: { type: String },
  Description: { type: String },
  CreatedAt: { type: Date, default: Date.now },
  TaskDate: { type: Date },
  TaskTime: { type: String },
}, {
  collection: "todo"
});

module.exports = mongoose.model("todo", todoSchema);
