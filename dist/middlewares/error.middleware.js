"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../utils/logger"));
// import { AppError } from "../errors/AppError";
const errorMiddleware = (err, _req, res, _next) => {
    logger_1.default.error(`[${err.name}] ${err.message}`, { stack: err.stack });
    console.error(`[Error] ${err.name}: ${err.message}`);
    if (err.stack)
        console.error(err.stack);
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: err.message, code: err.code });
    }
    //   if (err instanceof AppError) {
    //     return res.status(err.statusCode).json({ message: err.message });
    //   }
    return res.status(500).json({
        message: "Internal Server Error",
        detail: err.message || "Something went wrong",
    });
};
exports.errorMiddleware = errorMiddleware;
