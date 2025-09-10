"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorMiddleware = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ message: errors.array() });
        return;
    }
    next();
};
exports.validatorMiddleware = validatorMiddleware;
