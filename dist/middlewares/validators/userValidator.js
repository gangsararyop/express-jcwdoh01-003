"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = require("../validator.middleware");
exports.createUserValidator = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name is required field"),
    (0, express_validator_1.body)("email").isEmail().notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").isString().notEmpty().withMessage("Password is required"),
    validator_middleware_1.validatorMiddleware,
];
