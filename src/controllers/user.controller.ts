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
      const payload = {
        ...(req.body as User),
        profilePicture: req?.file?.path || "",
      };

      await this.userService.createUser(payload as User);

      res.status(200).send({ message: "Create user success" });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      throw new Error("Ini error");

      const users = await this.userService.getUsers();

      res.status(200).send({ data: users, message: "Get users success" });
    } catch (error) {
      next(error);
    }
  }
}
