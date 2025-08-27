import { User } from "@prisma/client";
import prisma from "../prisma";
import { cloudinaryUpload } from "../utils/cloudinary";
import emailer from "../utils/emailer";
import { redisClient } from "../utils/redis";

export default class UserService {
  async createUser(user: User) {
    await prisma.user.create({
      data: user,
    });
  }

  async getUsers() {
    // const redisData = await redisClient.get("users");

    // if (redisData) {
    //   console.log("Data dari cache");
    //   return JSON.parse(redisData);
    // }

    const users = await prisma.user.findMany();

    // console.log("Data dari DB");

    // await redisClient.setEx("users", 50, JSON.stringify(users));

    // await emailer({
    //   to: "gangsar45@gmail.com",
    //   pathToHtml: "src/emails/test-email.html",
    //   subject: "Ini Hanya Test",
    //   replacements: {
    //     name: users[0].name,
    //     age: 25,
    //   },
    // });

    return users;
  }
}
