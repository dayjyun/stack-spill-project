const express = require("express");
const router = express.Router();
const { Question, Answer } = require("../db/models");
const { requireAuth } = require("../utils/auth");
const { validateQuestion, validateAnswer } = require("../utils/validation");

// Get Question from an ID
router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findByPk(questionId, {
    include: [
      {
        model: Answer,
        attributes: ["id", "userId", "questionId", "body"],
      },
    ],
  });

  if (!question) {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
  res.json(question);
});

// Get All Questions
router.get("/", async (req, res) => {
  const Questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json({ Questions });
});

// Create an Answer
// answer validator
router.post("/:questionId", requireAuth, validateAnswer, async (req, res) => {
  const { user } = req;
  const { questionId } = req.params;
  const { body } = req.body;
  const question = await Question.findByPk(questionId);

  if (question) {
    const answer = await Answer.create({
      userId: user.id,
      questionId,
      body,
    });
    res.status(201);
    res.json(answer);
  } else {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
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
      res.json(question);
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
router.delete("/:questionId", requireAuth, async (req, res) => {
  const { user } = req;
  const { questionId } = req.params;
  const question = await Question.findByPk(questionId);

  if (question) {
    if (question.userId === user.id) {
      await question.destroy();
      res.json({
        message: "Successfully deleted question",
        statusCode: 200,
      });
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

module.exports = router;
