import * as z from "zod";
import { UserRole } from "@prisma/client";

const MAX_FILE_SIZE = 5000000;
const Accepted_Send_File_Types = [  
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword"
];

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

export const sendWorkSchema = z.object({
    email: z.string().email().optional(),
    fio_student: z.string({
        required_error: "Поле Фамилия Имя Отчество обязательно",
        invalid_type_error: "Фамилия Имя Отчество должно быть строкой",
      })
      .min(5, { message: "Поле Фамилия Имя Отчество не может состоять меньше чем из 5 букв" })
      .regex(/^\S+\s+\S+\s+\S+$/, "Поле ФИО должна содержать ровно три слова"),
    place_work_performers: z.string({
        required_error: "Поле место работы исполнителя обязательно",
        invalid_type_error: "Место работы исполнителя должно быть строкой",
    })
    .min(3, { message: "Поле место работы исполнителя не может состоять меньше чем из 3 букв" }),
    name_publication: z.string({
        required_error: {message: "Поле название публикации обязательно"},
        invalid_type_error: "Название публикации должно быть строкой",
    })
    .min(3, { message: "Поле название публикации не может состоять меньше чем из 3 букв" }),
    abstract_publication_rus: z.string({
        required_error: "Поле аннотация на руском языке обязательно",
        invalid_type_error: "Аннотация на руском языке должно быть строкой",
      })
    .min(3, { message: "Поле аннотация на руском языке обязательно" }),
    abstract_publication_eng: z.string().optional(),  // Если поле не обязательно
    lang_publication: z.string({
        required_error: "Поле язык публикации обязательно",
        invalid_type_error: "Язык Публикации должно быть строкой",
      })
    .min(3, { message: "Поле язык публикации обязательно" }),
    type_publication: z.any(), //.enum(["s1", "s2", "s3", "s4"]),
    keywords: z.string({
        required_error: "Поле ключевые слова обязательно",
        invalid_type_error: "Ключевые слова должно быть строкой",
      })
    .min(3, { message: "Поле ключевые слова обязательно" }),
    volume_publication: z.string({
        required_error: "Поле обьем публикации обязательно",
        invalid_type_error: "Объем публикации должно быть строкой",
      })
    .min(3, { message: "Поле обьем публикации обязательно" }),
    output_data: z.string().optional(),  // Если поле не обязательно
    attach_publication: z
    .any()
    .refine((files) => files?.length == 1, "Вы обязательно должны прикрепить публикацию.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер файла 5MB.`)
    .refine(
      (files) => Accepted_Send_File_Types.includes(files?.[0]?.type),
      "Только файлы с расширением: .doc, .docx, .pdf and .dot разрешены."
    ),
})

export const sendWorkSchemaApi = z.object({
    user_email: z.string().email(),
    fio_student: z.string({
        required_error: "Поле Фамилия Имя Отчество обязательно",
        invalid_type_error: "Фамилия Имя Отчество должно быть строкой",
      })
      .min(5, { message: "Поле Фамилия Имя Отчество не может состоять меньше чем из 5 букв" })
      .regex(/^\S+\s+\S+\s+\S+$/, "Поле ФИО должна содержать ровно три слова"),
    place_work_performers: z.string({
        required_error: "Поле место работы исполнителя обязательно",
        invalid_type_error: "Место работы исполнителя должно быть строкой",
    })
    .min(3, { message: "Поле место работы исполнителя не может состоять меньше чем из 3 букв" }),
    name_publication: z.string({
        required_error: {message: "Поле название публикации обязательно"},
        invalid_type_error: "Название публикации должно быть строкой",
    })
    .min(3, { message: "Поле название публикации не может состоять меньше чем из 3 букв" }),
    abstract_publication_rus: z.string({
        required_error: "Поле аннотация на руском языке обязательно",
        invalid_type_error: "Аннотация на руском языке должно быть строкой",
      })
    .min(3, { message: "Поле аннотация на руском языке обязательно" }),
    abstract_publication_eng: z.string().optional(),  // Если поле не обязательно
    lang_publication: z.string({
        required_error: "Поле язык публикации обязательно",
        invalid_type_error: "Язык Публикации должно быть строкой",
      })
    .min(3, { message: "Поле язык публикации обязательно" }),
    type_publication: z.any(), //.enum(["s1", "s2", "s3", "s4"]),
    keywords: z.string({
        required_error: "Поле ключевые слова обязательно",
        invalid_type_error: "Ключевые слова должно быть строкой",
      })
    .min(3, { message: "Поле ключевые слова обязательно" }),
    volume_publication: z.string({
        required_error: "Поле обьем публикации обязательно",
        invalid_type_error: "Объем публикации должно быть строкой",
      })
    .min(3, { message: "Поле обьем публикации обязательно" }),
    output_data: z.string().optional(),  // Если поле не обязательно
    attach_publication: z
    .any()
    .refine((files) => files, "Вы обязательно должны прикрепить публикацию.")
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Максимальный размер файла 5MB.`)
    .refine(
      (files) => Accepted_Send_File_Types.includes(files?.type),
      "Только файлы с расширением: .doc, .docx, .pdf and .dot разрешены."
    ),
})