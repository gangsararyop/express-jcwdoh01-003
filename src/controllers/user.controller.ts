import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { User } from "@prisma/client";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.createUser(req.body as User);

      res.status(200).send({ message: "Create user success" });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getUsers();

      res.status(200).send({ data: users, message: "Get users success" });
    } catch (error) {
      next(error);
    }
  }
}
