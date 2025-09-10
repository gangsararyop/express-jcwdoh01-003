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
const prisma_1 = __importDefault(require("../prisma"));
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.user.create({
                data: user,
            });
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            // const redisData = await redisClient.get("users");
            // if (redisData) {
            //   console.log("Data dari cache");
            //   return JSON.parse(redisData);
            // }
            const users = yield prisma_1.default.user.findMany();
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
        });
    }
}
exports.default = UserService;
