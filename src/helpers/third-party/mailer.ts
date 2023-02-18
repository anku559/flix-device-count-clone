import nodemailer from 'nodemailer';

interface MailEnv {
  MAIL_HOST: string;
  MAIL_SERVICE: string;
  MAIL_PORT: number;
  MAIL_IS_SECURE: boolean;
  MAIL_USER: string;
  MAIL_PASS: string;
}

const {
  MAIL_HOST,
  MAIL_SERVICE,
  MAIL_PORT,
  MAIL_IS_SECURE,
  MAIL_USER,
  MAIL_PASS,
}: MailEnv = {
  MAIL_HOST: String(process.env.MAIL_HOST),
  MAIL_SERVICE: String(process.env.MAIL_SERVICE),
  MAIL_PORT: Number(process.env.MAIL_PORT),
  MAIL_IS_SECURE: Boolean(process.env.MAIL_IS_SECURE),
  MAIL_USER: String(process.env.MAIL_USER),
  MAIL_PASS: String(process.env.MAIL_PASS),
};

async function sendEmail(email: string, subject: string, text: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      service: MAIL_SERVICE,
      port: MAIL_PORT,
      secure: MAIL_IS_SECURE,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: MAIL_USER,
      to: email,
      subject,
      // text,
      html: text,
    });

    console.log('Email sent successfully.');
  } catch (error) {
    console.log(error, 'Email not sent.');
  }
}

export default sendEmail;
