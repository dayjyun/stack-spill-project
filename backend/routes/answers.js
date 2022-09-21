const express = require("express");
const router = express.Router();
const { Answer } = require("../db/models");
const { requireAuth } = require("../utils/auth");

// Get Answer using ID
router.get("/:answerId", async (req, res) => {
  const { answerId } = req.params;
  const answer = await Answer.findByPk(answerId);

  if (!answer) {
    const error = new Error("Answer not found");
    error.status = 404;
    throw error;
  }
  res.json(answer);
});


// Get All Answers //! Not included in Wiki
router.get("/", async (req, res) => {
  const Answers = await Answer.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json({ Answers });
});


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
