import { serverConfig } from "@api/utils/config";
import Email, { EmailOptions } from "email-templates";
import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nunjucks from "nunjucks";
import path from "path";

export type MailTemplates = {
  custom: {
    lines: string[];
  };
};

export type MailArgs<K extends keyof MailTemplates> = MailTemplates[K];

export type MailOptions<K extends keyof MailTemplates> = {
  subject: string;
  sender?: string;
  receiver: string;
  template: K;
  locals: MailArgs<K>;
};

export class MailService {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = this.initTransporter();
  }

  public async send<K extends keyof MailTemplates>(options: MailOptions<K>) {
    const sender = `shipping@${this.url("").hostname}`;
    const emailOptions: EmailOptions = {
      template: options.template,
      locals: {
        ...this.defaultOptions(options.subject),
        ...options.locals,
      },
      message: {
        from: `${serverConfig.app.NAME} <${sender}>`,
        subject: options.subject,
        to: options.receiver,
      },
    };

    const email = new Email({
      transport: this.transporter,
      preview: false,
      send: true,
      views: {
        root: this.templateRoot(),
        options: {
          extension: "njk",
        },
      },
    });

    return email.send(emailOptions);
  }

  public url(path: string) {
    if (!serverConfig.app.isProd) {
      return new URL(path, "http://localhost:5173");
    }
    return new URL(path, serverConfig.app.DOMAIN);
  }

  public parseLines(body: string) {
    // replacers
    const replacedBody = body.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // spacing
    const lines = replacedBody
      .split("\n\n")
      .map((part) => part.split("\n").join("<br/>"));

    return lines;
  }

  private templateRoot() {
    return path.resolve("templates");
  }

  private defaultOptions(subject: string) {
    return {
      subject,
      app_name: serverConfig.app.NAME,
      app_url: serverConfig.app.DOMAIN,
      support_email: `support@${this.url("").hostname}`,
      abuse_email: `abuse@${this.url("").hostname}`,
      date: new Date().getFullYear(),
    } as const;
  }

  private initTransporter() {
    if (!serverConfig.app.isProd) {
      return createTransport({
        port: 1025,
      });
    }

    return createTransport({
      service: "gmail",
      auth: {
        user: serverConfig.app.EMAIL,
        pass: serverConfig.app.PASS,
      },
    });
  }

  public noop() {
    const data = nunjucks.renderString("Hello {{ username }}", {
      username: "James",
    });
    console.log(data);
  }
}
