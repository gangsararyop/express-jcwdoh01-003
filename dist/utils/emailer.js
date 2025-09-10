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
const nodemailer_1 = __importDefault(require("nodemailer"));
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
const emailer = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, pathToHtml, replacements, attachments } = options;
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "gangsar.purwadhika@gmail.com",
                pass: "arfj mcgt gvnj antk",
            },
        });
        const template = yield promises_1.default.readFile(pathToHtml, { encoding: "utf-8" });
        const compiledTemplate = handlebars_1.default.compile(template);
        const html = compiledTemplate(replacements);
        const message = {
            from: "Gangsar Aryo <gangsar.purwadhika@gmail.com>",
            to,
            html,
            subject,
            attachments,
        };
        yield transporter.sendMail(message);
        return {
            status: "SUCCESS",
            message: "Send email success",
        };
    }
    catch (error) {
        console.log("Emailer error : ", error);
    }
});
exports.default = emailer;
