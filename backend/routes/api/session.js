// backend/routes/api/session.js
const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { validateLogin } = require("../../utils/validation");
const router = express.Router();

// =============  Log in =================//
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

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// test route
router.get("/session/test", (req, res) => {
  res.send("Welcome To Session! 👋🏼");
});

module.exports = router;
