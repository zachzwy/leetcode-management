const express = require("express");

const Question = require("../../models/Question");

const router = express.Router();

router.get("/", (req, res) => {
  Question.find()
    .sort({ createdAt: -1 })
    .then(questions => res.json(questions))
    .catch(err =>
      res.status(404).json({ noQuestionsFound: "No questions found" })
    );
});

router.post("/add-question", (req, res) => {
  const newQuestion = new Question({
    title: req.body.title,
    link: req.body.link,
    tag: req.body.tag
  });

  newQuestion
    .save()
    .then(question => res.json(question))
    .catch(err => console.log(err));
});

module.exports = router;
