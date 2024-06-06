import { db } from "@/lib/db";
export const LoadTypesPublication = async () => {
    try {
        const typesPublication = await db.type_Publication.findMany();
        return typesPublication;
    }
    catch {
        return null;
    }
};