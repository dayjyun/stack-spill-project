const express = require("express");
const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { User } = require("../db/models");
const router = express.Router();

// Get Current User
router.get("/me", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      me: user.toSafeObject(),
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
  const Users = await User.findAll();
  res.json({ Users })
})


// Edit A User



// Get All Questions of a User



// Get ALl Answers of a User

module.exports = router;
