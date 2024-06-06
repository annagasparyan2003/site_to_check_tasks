import prisma from "./prisma/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export default {
    providers: [
        Credentials({
            name: "Sign in",
            id: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: String(credentials.email),
                    },
                });
                if (!user || !user.password)
                    return false;
                if (await bcrypt.compare(String(credentials.password), user.password)) {
                    // delete user.password, delete user.createdAt;
                    return user;
                }
            },
        }),
    ],
};
