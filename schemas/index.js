import * as z from "zod";
import { UserRole } from "@prisma/client";
const passwordRequired = (data, passwordField, newPasswordField, newPasswordConfirmationField = "newPasswordConfirmation") => {
    const newPasswordEntered = data[newPasswordField] !== undefined;
    const confirmationEntered = data[newPasswordConfirmationField] !== undefined;
    if (newPasswordEntered && !confirmationEntered) {
        return false;
    }
    return !((data[passwordField] && !data[newPasswordField]) ||
        (data[newPasswordField] && !data[passwordField]));
};
export const SettingsSchema = z
    .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(1)),
    newPassword: z.optional(z.string().min(6, {
        message: "Пожалуйста, введите новый пароль, содержащий не менее 6 символов",
    })),
    newPasswordConfirmation: z.optional(z.string().min(6, {
        message: "Пожалуйста, подтвердите свой пароль, используя не менее 6 символ",
    })),
})
    .refine((data) => passwordRequired(data, "password", "newPassword"), {
    message: "Пожалуйста, введите новый пароль, содержащий не менее 6 символов.",
    path: ["newPassword"],
})
    .refine((data) => passwordRequired(data, "newPassword", "password"), {
    message: "Пожалуйста, введите свой текущий пароль.",
    path: ["password"],
})
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Пароли не совпадают.",
    path: ["newPasswordConfirmation"],
});
export const NewPasswordSchema = z
    .object({
    password: z.string().min(6, {
        message: "Пожалуйста, введите свой пароль",
    }),
    passwordConfirmation: z.string().min(6, {
        message: "Пожалуйста, подтвердите свой пароль.",
    }),
})
    .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли не совпадают.",
    path: ["passwordConfirmation"],
});
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Пожалуйста, введите действительный адрес электронной почты.",
    }),
});
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Пожалуйста, введите действительный адрес электронной почты. Поле не должно быть пустым.",
    }),
    password: z.string().min(1, {
        message: "Пожалуйста, введите пароль. Поле не должно быть пустым.",
    }),
    code: z.optional(z.string()),
});
export const RegisterSchema = z
    .object({
    name: z.string().min(1, {
        message: "Пожалуйста, введите имя.",
    }),
    email: z.string().email({
        message: "Пожалуйста, введите действительный адрес электронной почты.",
    }),
    password: z.string().min(6, {
        message: "Пожалуйста, введите пароль, состоящий не менее чем из 6 символов.",
    }),
    passwordConfirmation: z.string().min(6, {
        message: "Пожалуйста, подтвердите свой пароль.",
    }),
})
    .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли не совпадают.",
    path: ["passwordConfirmation"],
});
