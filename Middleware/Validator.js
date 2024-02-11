const { body } = require("express-validator");

const ValidateEmail = [
  body("email").isEmail().withMessage("Please enter a valid email"),
];

module.exports = ValidateEmail;
