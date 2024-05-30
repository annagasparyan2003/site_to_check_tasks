import NextAuth from "next-auth";
import authOptions from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user)
                token.role = user.role;
            return token;
        },
        async session({ token, session }) {
            if (session?.user)
                session.user.role = token.role;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    debug: true,
    ...authOptions
});
