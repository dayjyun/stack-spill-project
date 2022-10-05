const express = require("express");
const router = express.Router();
const { Question, Answer, Vote } = require("../db/models");
const { requireAuth } = require("../utils/auth");
const { validateQuestion, validateAnswer, validateVote, validateOneAnswer, } = require("../utils/validation");

// Get Votes for a Question
router.get("/:questionId/votes", async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findByPk(questionId);

  if (question) {
    const votes = await Vote.findAll({
      where: { questionId },
    });
    res.json(votes);
  } else {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
});

// Get Question from an ID
router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const upVote = await Vote.count({ where: { questionId, vote: true } });
  const downVote = await Vote.count({ where: { questionId, vote: false } });
  const numVotes = upVote - downVote;
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
  question.dataValues.votes = numVotes;
  res.json(question);
});

// Get All Questions
router.get("/", async (req, res) => {
  const questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(questions);
});

// Create a Vote for a Question
router.post("/:questionId/votes", requireAuth, validateVote,  async (req, res) => {
    const { user } = req;
    const { questionId } = req.params;
    const { vote } = req.body;
    const question = await Question.findByPk(questionId);
    const currentVote = await Vote.findOne({
      where: { userId: user.id, questionId },
    });

    if (question) {
      if (!currentVote) {
        const newVote = await Vote.create({
          userId: user.id,
          vote,
          questionId,
        });
        res.status(201);
        res.json(newVote);
      } else {
        const error = new Error("Vote already exists")
        error.status = 404;
        throw error;
      }
    } else {
      const error = new Error("Question Not Found");
      error.status = 404;
      throw error;
    }
  }
);

// Create an Answer
router.post("/:questionId", requireAuth, validateAnswer, validateOneAnswer, async (req, res) => {
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

// Edit a vote
router.put("/:questionId/votes", requireAuth, validateVote, async (req, res) => {
  const { user } = req;
  const { questionId } = req.params;
  const { vote } = req.body;
  const question = await Question.findByPk(questionId);
  const currentVote = await Vote.findOne({
    where: { userId: user.id, questionId },
  });

  if (question) {
    if (currentVote) {
      await currentVote.update({
        vote,
      });
      res.json(currentVote);
    } else {
      // const newVote = await Vote.create({
      //   userId: user.id,
      //   vote,
      //   questionId,
      // })
      // res.status(201)
      // res.json(newVote)
      const error = new Error('Vote not found')
      error.status = 404
      throw error;
    }
  } else {
    const error = new Error("Question not found");
    error.status = 404;
    throw error;
  }
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

// Delete A Vote
router.delete("/:questionId/votes", requireAuth, async (req, res) => {
  const { user } = req;
  const { questionId } = req.params;
  const question = await Question.findByPk(questionId);
  const userVote = await Vote.findOne({ where: { userId: user.id, questionId } });

  if (question) {
    if (userVote) {
      const deletedVote = userVote;
      await userVote.destroy();
      res.json({
        deletedVote,
        message: "Successfully deleted vote",
        statusCode: 200,
      });
    } else {
      const error = new Error("Vote not found");
      error.status = 404;
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
