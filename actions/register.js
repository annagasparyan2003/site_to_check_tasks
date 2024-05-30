"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Недопустимые поля." };
    }
    const { name, password, email } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        return { error: "Электронная почта пользователя уже используется." };
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Регистрация завершена. Подтвердите свой адрес электронной почты!" };
};
