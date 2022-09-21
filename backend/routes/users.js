const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { User, Question, Answer } = require("../db/models");

// Get Current User
router.get("/me", requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      me: user.toSafeObject(),
    });
  } else return res.json("Not logged in");
});


// Get User by ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId)
  if (!user) {
    const error = new Error("User not found")
    error.status = 404;
    throw error;
  }
  res.json(user)
})


// Get All Users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users)
})


// Edit A User
// router.put('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const user = User.findByPk(userId)

//   if (user) {
//     if (user.id == )
        // how to get current session user?
//   }
// })


// Get All Questions of a User
router.get('/:userId/questions', async (req, res) => {
  const { userId } = req.params;
  const questions = await Question.findAll({
    where: { userId: userId }
  })

  if (questions.length === 0) {
    res.json({questions: ["User has not asked any questions"]})
  }

  res.json(questions)
})


// Get All Answers of a User
router.get('/:userId/answers', async(req, res) => {
  const { userId } = req.params;
  const answers = await Answer.findAll({
    where: { userId: userId }
  })

  if (answers.length === 0) {
    res.json({answers: ["User has not answered any questions"]})
  }

  res.json(answers)
})

module.exports = router;
