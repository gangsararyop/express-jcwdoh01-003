import request from "supertest";
import { prismaMock } from "../setup_test/singleton";
import App from "../app";

test("should return an array of users", async () => {
  const date = new Date();

  prismaMock.user.findMany.mockResolvedValue([
    {
      name: "Gangsar",
      email: "gangsar@mail.com",
      password: "halo123;",
      id: 1,
      profilePicture: null,
      createdAt: date,
      updatedAt: date,
    },
    {
      name: "Aryo",
      email: "aryo@mail.com",
      password: "halo123;",
      id: 2,
      profilePicture: null,
      createdAt: date,
      updatedAt: date,
    },
  ]);

  await request(new App().app)
    .get("/users")
    .expect(({ body }) => {
      expect(body.data).toMatchObject([
        {
          name: "Gangsar",
          email: "gangsar@mail.com",
          password: "halo123;",
          id: 1,
          profilePicture: null,
          createdAt: date.toISOString(),
          updatedAt: date.toISOString(),
        },
        {
          name: "Aryo",
          email: "aryo@mail.com",
          password: "halo123;",
          id: 2,
          profilePicture: null,
          createdAt: date.toISOString(),
          updatedAt: date.toISOString(),
        },
      ]);
    });
});
