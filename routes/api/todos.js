const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Todo = require("../../models/Todo");
// const validateTweetInput = require("../../validation/tweets");

const router = express.Router();

router.get("/", (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then(todos => {
      res.json(todos);
    })
    .catch(err => res.status(404).json({ notodofound: "No todos found" }));
});

router.post("/add-todo", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  newTodo
    .save()
    .then(todo => res.json(todo))
    .catch(err => console.log(err));
});

router.put("/toggle-todo/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo =>
      todo.update({
        isCompleted: !todo.isCompleted
      })
    )
    .then(query => res.send("Successfully toggle todo"))
    .catch(err => console.log(err));
});

router.delete("/delete-todo/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(query => res.send("Successfully delete todo"))
    .catch(err => console.log(err));
});

module.exports = router;
