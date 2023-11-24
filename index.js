const mongoose = require("mongoose");
const express = require("express");
const userController = require("./controller/userController");
const todoController=require("./controller/todoController");

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 15;

const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(15);

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://user:123@cluster0.gldrpii.mongodb.net/review");
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/userRoute", userController);
app.use("/todoRoute",todoController);


app.listen(4000, () => {
    console.log("Server connected at 4000");
});
