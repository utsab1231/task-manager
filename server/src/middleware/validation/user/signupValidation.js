import { check } from "express-validator";

export const signUp = [
  check("username", "Username is required")
    .notEmpty()
    .exists()
    .trim()
    .escape()
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be between 5 to 20 characters")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  check("email", "Email is required")
    .exists()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Email is invalid"),

  check("password", "Password is required")
    .exists()
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long"),
];
