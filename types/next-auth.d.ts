// import NextAuth, { User as NextAuthUser } from "next-auth";
import { UserRole } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        id: string;
        role: UserRole;
        user: User & Session["user"];
    }

    interface User {
        id: string;
        email: string;
        name: string;
        image: string;
        role: UserRole;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
    }
}
