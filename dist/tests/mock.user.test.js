"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const singleton_1 = require("../setup_test/singleton");
const app_1 = __importDefault(require("../app"));
test("should return an array of users", () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    singleton_1.prismaMock.user.findMany.mockResolvedValue([
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
    yield (0, supertest_1.default)(new app_1.default().app)
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
}));
