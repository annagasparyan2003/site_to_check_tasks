"use server";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken, generateTwoFactorToken, } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { db } from "@/lib/db";
export const login = async (values, callbackUrl) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Недопустимые поля" };
    }
    const { email, password, code } = validatedFields.data;
    const existingUser = await db.user.findUnique({
        where: { email },
    });
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Пользователь не зарегистрирован!" };
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Отправлено электронное письмо для подтверждения!" };
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Неверные учетные данные!" };
                default:
                    return { error: "Что-то пошло не так!" };
            }
        }
        throw error;
    }
};
