const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { Answer } = require('../db/models')

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

// api/session.js
const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// api/session.js
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];


// api/questions
const validateQuestion = [
  check("title")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a title for your question"),
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide details about your question"),
  handleValidationErrors
]

const validateAnswer = [
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Please provide a detailed answer"),
  handleValidationErrors
]

const validateOneAnswer = async (req, res, next) => {
  const { user } = req;
  const { questionId } = req.params;
  const answer = await Answer.findOne({
    where: {
      userId: user.id,
      questionId,
    },
  });
  if (answer) {
    const error = new Error("Answer already exists");
    error.status = 400;
    throw error;
  }
  next();
};

const validateVote = [
  check("vote")
    .exists({ checkFalsy: false })
    .notEmpty()
    .withMessage("Please provide a vote"),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateQuestion,
  validateAnswer,
  validateOneAnswer,
  validateVote,
};
