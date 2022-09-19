const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { validateSignup } = require("../../utils/validation");

//================== Sign up ==========================//
router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const checkEmail = await User.findOne({ where: { email }})
  const checkUsername = await User.findOne({ where: { username } })

  if (checkEmail) {
    let error = new Error("User already exists")
    error.status = 403;
    error.errors = ['User with that email already exists'];
    throw error;
  }

  if (checkUsername) {
    let error = new Error("User already exists")
    error.status = 403;
    error.errors = ["User with that username already exists"];
    throw error;
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
    // profileImage
  })

  const token = await setTokenCookie(res, user);

  return res.json({ ...user.toSafeObject(), token });
});

// test route
router.get("/test", (req, res) => {
  res.send("Welcome To Users! 👋🏼");
});

module.exports = router;
