import { User } from "@prisma/client";
import prisma from "../prisma";
import { cloudinaryUpload } from "../utils/cloudinary";
import emailer from "../utils/emailer";

export default class UserService {
  async createUser(user: User) {
    await prisma.user.create({
      data: user,
    });
  }

  async getUsers() {
    const users = await prisma.user.findMany();

    await emailer({
      to: "gangsar45@gmail.com",
      pathToHtml: "src/emails/test-email.html",
      subject: "Ini Hanya Test",
      replacements: {
        name: users[0].name,
        age: 25,
      },
    });

    return users;
  }
}
