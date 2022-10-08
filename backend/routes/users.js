const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { User, Question, Answer } = require("../db/models");
const { singleMulterUpload, singlePublicFileUpload } = require("../awsS3");

// Get Current User
router.get("/me", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject(),
    });
  } else return res.json({});
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
router.put('/:userId', requireAuth, singleMulterUpload("profileImage"), async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const { firstName, lastName, username, email } = req.body;
  const profileImage = await singlePublicFileUpload(req.file)
  const userInfo = await User.findByPk(userId)

  if (userInfo) {
    if (userInfo.id === user.id) {
      let updatedUser = await userInfo.update({
        firstName,
        lastName,
        username,
        email,
        profileImage,
      });
      res.json(updatedUser)
    } else {
      const error = new Error("Unauthorized")
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("User not found")
    error.status = 404;
    throw error;
  }
})


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
