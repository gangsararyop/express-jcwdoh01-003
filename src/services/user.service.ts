import { User } from "@prisma/client";
import prisma from "../prisma";

export default class UserService {
  async createUser(user: User) {
    await prisma.user.create({
      data: user,
    });
  }

  async getUsers() {
    const users = await prisma.user.findMany();

    return users;
  }
}
