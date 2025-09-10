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
const app_1 = __importDefault(require("../app"));
const prisma_1 = __importDefault(require("../prisma"));
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
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.$connect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield prisma_1.default.user.findMany();
        if (users.length === 0) {
            yield prisma_1.default.user.createMany({
                data: sampleUsers,
            });
        }
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.user.deleteMany({ where: {} });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.$disconnect();
    }));
    it("should return an array of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(new app_1.default().app).get("/users");
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
    }));
});
