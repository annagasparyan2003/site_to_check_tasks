import { NextResponse } from "next/server";
import { sendWorkSchemaApi } from "@/schemas";
import { getUserByEmail } from "@/data/user"
import path from "path";
import { writeFile } from 'fs/promises';
import prisma from "@/prisma/prisma";
import { sendNewPublicationEmail } from "@/lib/mail";

export const POST = async (req, res) => {
    const formData = await req.formData();
    const values = {}
    const Data_name_files = {}
    let buffer;
    let filename;
    for (let [key, item] of formData) {
        values[key] = item
        if (key == 'attach_publication') {
            buffer = Buffer.from(await item.arrayBuffer());
            filename = Date.now() + "_" + item.name.replaceAll(" ", "_");
        }
    }
    const validatedFields = sendWorkSchemaApi.safeParse(values);
    
    try {
        await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
        Data_name_files[0] = filename;
    } catch (error) {
        console.log("Ошибка при создании файла для публикации ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
    const user = await getUserByEmail(validatedFields.data.user_email)
    const id = Number(validatedFields.data.type_publication.slice(1))
    try {
        const post = await prisma.post.create({
            data: {
                name_publication: validatedFields.data.name_publication,
                fio_author: validatedFields.data.fio_student,
                place_work_performers: validatedFields.data.place_work_performers,
                abstract_publication_rus: validatedFields.data.abstract_publication_rus,
                abstract_publication_eng: validatedFields.data.abstract_publication_eng,
                lang_publication: validatedFields.data.lang_publication,
                type_publication: {
                    connect: { id },
                },
                keywords: validatedFields.data.keywords,
                volume_publication: validatedFields.data.volume_publication,
                output_data: validatedFields.data.output_data,
                attach_publication: Data_name_files,
                authorId: user.id,
                createdAt: new Date().toISOString(),
                editedAt: new Date().toISOString(),
            },
        });
        await sendNewPublicationEmail(process.env.ADMIN_EMAIL, post.id);
        return NextResponse.json({
            post: {
                name_publication: post.name_publication,
                id: post.id
            },
            success: "Ваше публикация опубликована",
            status: 201,
            Message: "Успешно"
        });
    } catch (error) {
        console.log("Ошибка при создании публикации ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};