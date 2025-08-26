import nodemailer from "nodemailer";
import fs from "fs/promises";
import Handlebars from "handlebars";

interface IEmailer {
  to: string;
  subject: string;
  pathToHtml: string;
  replacements?: Record<string, any>;
  attachments?: any;
}

const emailer = async (options: IEmailer) => {
  const { to, subject, pathToHtml, replacements, attachments } = options;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gangsar.purwadhika@gmail.com",
        pass: "arfj mcgt gvnj antk",
      },
    });

    const template = await fs.readFile(pathToHtml, { encoding: "utf-8" });

    const compiledTemplate = Handlebars.compile(template);

    const html = compiledTemplate(replacements);

    const message = {
      from: "Gangsar Aryo <gangsar.purwadhika@gmail.com>",
      to,
      html,
      subject,
      attachments,
    };

    await transporter.sendMail(message);

    return {
      status: "SUCCESS",
      message: "Send email success",
    };
  } catch (error) {
    console.log("Emailer error : ", error);
  }
};

export default emailer;
