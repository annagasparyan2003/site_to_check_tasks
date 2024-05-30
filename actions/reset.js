"use server";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { db } from "@/lib/db";
export const reset = async (values) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Неверный адрес электронной почты!" };
    }
    const { email } = validatedFields.data;
    const existingUser = await db.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        return { error: "Адрес электронной почты не найден!" };
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    return { success: "Сброс пароля отправлен на электронную почту!" };
};
