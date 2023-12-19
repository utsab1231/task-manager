import { check } from "express-validator";

const createTaskValidation = [
  check("title", "title is required")
    .exists()
    .notEmpty()
    .withMessage("title can't be empty")
    .trim()
    .escape()
    .isLength({ max: 30 })
    .withMessage("title can't be more than 30 characters"),
  check("description", "description is required")
    .exists()
    .notEmpty()
    .withMessage("description can't be empty")
    .trim()
    .escape(),
 
];

export default createTaskValidation;
