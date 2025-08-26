import { Router } from "express";
import UserController from "../controllers/user.controller";
import { createUserValidator } from "../middlewares/validators/userValidator";
import {
  memoryUploader,
  multipleFilesDiffField,
  multipleFilesSameField,
  singleFile,
} from "../utils/uploader";

export default class UserRoute {
  public router: Router;

  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    // ==== GET ====
    // /users
    this.router.get(
      "/",
      // multipleFilesDiffField(
      //   [
      //     {
      //       name: "image1",
      //       maxCount: 2,
      //     },
      //     {
      //       name: "image2",
      //     },
      //   ],
      //   "DIFF",
      //   "/different-field"
      // ),

      // memoryUploader().single("file"),
      this.userController.getUsers.bind(this.userController)
    );

    // ==== POST ====
    // /users
    this.router.post(
      "/",
      // createUserValidator,
      singleFile("PP", "/profile-picture"),
      this.userController.createUser.bind(this.userController)
    );
  }
}
