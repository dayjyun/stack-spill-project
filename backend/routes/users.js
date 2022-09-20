const express = require("express");
const { setTokenCookie, requireAuth, restoreUser } = require("../utils/auth");
const { User } = require("../db/models");
const router = express.Router();


// Restore session user // Get Current User
router.get("/me", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

// test route
router.get("/users/test", (req, res) => {
  res.send("Welcome To Users! 👋🏼");
});

module.exports = router;
