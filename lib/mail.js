// import { Resend } from "resend";
import nodemailer from 'nodemailer';
// const resend = new Resend(process.env.RESEND_API_KEY);
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN
//   }
// });
const transporter = nodemailer.createTransport({
    host: "smpt.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NOMDEMAILER_USERNAME,
        pass: process.env.NOMDEMAILER_PASSWORD
    },
});
const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendTwoFactorTokenEmail = async (email, token) => {
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "2FA Code",
        // TODO: Add a template for this email
        html: `<p>Your 2FA code: ${token}</p>`,
    });
};
export const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "Reset your password",
        // TODO: Add a template for this email
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
};
export const sendVerificationEmail = async (email, token) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "Verify your email.",
        // TODO: Add a template for this email
        html: `<p>Click <a href="${confirmLink}">here</a> to verify email.</p>`,
    });
};
