import { body } from "express-validator";

const Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required, example: test@exam.ple")
    .matches(Email)
    .withMessage("Invalid email format, example: test@exam.ple"),
  body("password")
    .notEmpty()
    .withMessage("Password is required, example: Example1")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(Password)
    .withMessage(
      "Password must include an uppercase / lowercase letter and a number, example: Example1"
    ),
  body("username")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
];

export const loginUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required, example: test@exam.ple")
    .matches(Email)
    .withMessage("Invalid email format, example: test@exam.ple"),
  body("password")
    .notEmpty()
    .withMessage("Password is required, example: Example1")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(Password)
    .withMessage(
      "Password must include an uppercase / lowercase letter and a number, example: Example1"
    ),
];
