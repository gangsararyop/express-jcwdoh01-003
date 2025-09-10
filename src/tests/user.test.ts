import request from "supertest";
import App from "../app";
import prisma from "../prisma";

describe("GET /users", () => {
  const date = new Date();

  const sampleUsers = [
    {
      id: 1,
      name: "Gangsar",
      email: "gangsar@mail.com",
      password: "halo123;",
      createdAt: date,
      updatedAt: date,
      profilePicture: "",
    },
    {
      id: 2,
      name: "Aryo",
      email: "aryo@mail.com",
      password: "halo123;",
      createdAt: date,
      updatedAt: date,
      profilePicture: "",
    },
  ];

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      await prisma.user.createMany({
        data: sampleUsers,
      });
    }
  });

  afterEach(async () => {
    await prisma.user.deleteMany({ where: {} });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return an array of users", async () => {
    const response = await request(new App().app).get("/users");

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      message: "Get users success",
      data: sampleUsers.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
        profilePicture: item.profilePicture,
      })),
    });
  });
});
