"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const uploader_1 = require("../utils/uploader");
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // ==== GET ====
        // /users
        this.router.get("/", this.userController.getUsers.bind(this.userController));
        // ==== POST ====
        // /users
        this.router.post("/", 
        // createUserValidator,
        (0, uploader_1.singleFile)("PP", "/profile-picture"), this.userController.createUser.bind(this.userController));
    }
}
exports.default = UserRoute;
