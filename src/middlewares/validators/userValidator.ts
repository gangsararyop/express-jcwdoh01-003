import { body } from "express-validator";
import { validatorMiddleware } from "../validator.middleware";

export const createUserValidator = [
  body("name").isString().notEmpty().withMessage("Name is required field"),
  body("email").isEmail().notEmpty().withMessage("Email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  validatorMiddleware,
];
