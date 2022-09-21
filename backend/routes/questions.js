const express = require("express");
const router = express.Router();
const { Question } = require("../db/models");
const { requireAuth } = require("../utils/auth");
const { validateQuestion } = require("../utils/validation");

// Get Question from an ID
router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const Query = await Question.findByPk(questionId);

  if (!Query) {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
  res.json({ Query });
});

// Get All Questions
router.get("/", async (req, res) => {
  const Questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json({ Questions });
});

// Create A Question
router.post("/", requireAuth, validateQuestion, async (req, res) => {
  const { user } = req;
  const { title, body } = req.body;
  const question = await Question.create({
    userId: user.id,
    title,
    body,
  });

  res.status(201);
  res.json(question);
});

// Edit A Question
router.put("/:questionId", requireAuth, async (req, res) => {
  const { user } = req;
  const { questionId } = req.params;
  const { title, body } = req.body;
  const question = await Question.findByPk(questionId);

  if (question) {
    if (question.userId === user.id) {
      await question.update({
        title,
        body,
      });
      res.json(question)
    } else {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
});

// Delete A Question

module.exports = router;
