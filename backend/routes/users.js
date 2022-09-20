const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { User, Question, Answer } = require("../db/models");

// Get Current User
router.get("/me", requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      Me: user.toSafeObject(),
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
  const Users = await User.findAll();
  res.json({ Users })
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
  const Questions = await Question.findAll({
    where: { userId: userId }
  })

  if (Questions.length === 0) {
    // res.json({Questions: ["User has not asked any questions"]})
    const error = new Error("User has not asked any questions")
    error.status = 404;
    throw error;
  }

  res.json({ Questions })
})


// Get All Answers of a User
router.get('/:userId/answers', async(req, res) => {
  const { userId } = req.params;
  const Answers = await Answer.findAll({
    where: { userId: userId }
  })

  if (Answers.length === 0) {
    // res.json({Answers: ["User has not answered any questions"]})
    const error = new Error("User has not answered any questions")
    error.status = 404;
    throw error;
  }

  res.json({ Answers })
})

module.exports = router;
