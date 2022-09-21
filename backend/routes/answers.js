const express = require("express");
const router = express.Router();
const { Answer, Vote } = require("../db/models");
const { requireAuth } = require("../utils/auth");

// Get Answer using ID
router.get("/:answerId", async (req, res) => {
  const { answerId } = req.params;
  const answer = await Answer.findByPk(answerId);
  const upVote = await Vote.count({ where: { answerId, vote: true } });
  const downVote = await Vote.count({ where: { answerId, vote: false } });
  const numVotes = upVote - downVote;

  if (!answer) {
    const error = new Error("Answer not found");
    error.status = 404;
    throw error;
  }
  answer.dataValues.votes = numVotes;
  res.json(answer);
});


// Get All Answers //! Not included in Wiki
router.get("/", async (req, res) => {
  const answers = await Answer.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(answers);
});

// ==================== Votes ==================== //

// Create a Vote for a Answer
router.post("/:answerId/votes", requireAuth, async (req, res) => {
  const { user } = req;
  const { answerId } = req.params;
  const { vote } = req.body;
  const answer = await Answer.findByPk(answerId);

  if (answer) {
    const newVote = await Vote.create({
      userId: user.id,
      vote,
      answerId,
    });
    res.status(201);
    res.json(newVote);
  } else {
    const error = new Error("Answer Not Found");
    error.status = 404;
    throw error;
  }
});


// Delete A Vote
router.delete("/:answerId/votes", requireAuth, async (req, res) => {
  const { user } = req;
  const { answerId } = req.params;
  const answer = await Answer.findByPk(answerId);
  const userVote = await Vote.findOne({ where: { userId: user.id }});

  if (answer) {
    // verify that vote belongs to answer
    await userVote.destroy();
    res.json({
      message: "Successfully deleted vote",
      statusCode: 200,
    });
  } else {
    const error = new Error("Answer not found");
    error.status = 404;
    throw error;
  }
});

// ==================== Votes ==================== //


// Edit Answer
router.put("/:answerId", requireAuth, async (req, res) => {
  const { user } = req;
  const { answerId } = req.params;
  const { body } = req.body;
  const answer = await Answer.findByPk(answerId);

  if (answer) {
    if (answer.userId === user.id) {
      await answer.update({
        body,
      });
      res.json(answer);
    } else {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Answer not found");
    error.status = 404;
    throw error;
  }
});


// Delete Answer
router.delete('/:answerId', requireAuth, async (req, res) => {
    const { user } = req;
    const { answerId } = req.params;
    const answer = await Answer.findByPk(answerId)

    if (answer) {
        if (answer.userId === user.id) {
            await answer.destroy()
            res.json({
                message: "Successfully deleted answer",
                statusCode: 200,
            })
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Answer not found")
        error.status = 404;
        throw error;
    }
})

module.exports = router;
