// backend/routes/api/session.js
const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { validateLogin, validateSignup } = require("../../utils/validation");
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");
const router = express.Router();

// Log in
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    return next(err);
  }

  const token = await setTokenCookie(res, user);

  return res.json({ ...user.toSafeObject(), token });
});


// Log out
router.delete("/logout", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logout successful" });
});

// Sign up with Profile Image
router.post("/signup/profileImage", validateSignup,
  singleMulterUpload("profileImage"), async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const profileImage = await singlePublicFileUpload(req.file);
  const checkEmail = await User.findOne({ where: { email } });
  const checkUsername = await User.findOne({ where: { username } });

  if (checkEmail) {
    let error = new Error("User already exists");
    error.status = 403;
    error.errors = ["Email already exists"];
    throw error;
  }

  if (checkUsername) {
    let error = new Error("User already exists");
    error.status = 403;
    error.errors = ["Username already exists"];
    throw error;
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
    profileImage,
  });

  let token = await setTokenCookie(res, user);
  return res.json({ ...user.toSafeObject(), token });
});

// Sign up
router.post("/signup", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username, profileImage } = req.body;
  const checkEmail = await User.findOne({ where: { email }})
  const checkUsername = await User.findOne({ where: { username } })

  if (checkEmail) {
    let error = new Error("User already exists")
    error.status = 403;
    error.errors = ['Email already exists'];
    throw error;
  }

  if (checkUsername) {
    let error = new Error("User already exists")
    error.status = 403;
    error.errors = ["Username already exists"];
    throw error;
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
    profileImage
  })

  let token = await setTokenCookie(res, user);
  return res.json({ ...user.toSafeObject(), token });
});

module.exports = router;
