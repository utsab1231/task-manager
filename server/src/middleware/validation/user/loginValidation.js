import { check } from "express-validator";

export const loginValidation = [
  check("username", "Username is required")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be between 5 to 20 characters long"),

  check("password", "Password is required")
    .exists()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long"),
];
