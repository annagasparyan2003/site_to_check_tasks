
import nodemailer from 'nodemailer';

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
        subject: "Код потверждения",
        // TODO: Add a template for this email
        html: `<p>Ваш код потверждения: ${token}</p>`,
    });
};
export const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "Восстановление вашего пароля",
        // TODO: Add a template for this email
        html: `<p>Нажмите <a href="${resetLink}">сюда</a> для восстановления пароля.</p>`,
    });
};
export const sendVerificationEmail = async (email, token) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "Подтвердите ваш электронный адрес.",
        // TODO: Add a template for this email
        html: `<p>Нажмите <a href="${confirmLink}">сюда</a> для подтверждения электронной почты.</p>`,
    });
};

export const sendNewPublicationEmail = async (email, id) => {
    const publicationLink = `${domain}/publications/${id}`;
    await transporter.sendMail({
        from: "Acme <" + process.env.NOMDEMAILER_USERNAME + ">",
        to: email,
        subject: "Новая публикация на сайте.",
        // TODO: Add a template for this email
        html: `<p>Нажмите <a href="${publicationLink}">сюда</a> чтобы перейти к ней.</p>`,
    });
};