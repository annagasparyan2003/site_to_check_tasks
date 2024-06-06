import { db } from "@/lib/db";
export const LoadAllPosts = async () => {
    try {
        const postitems = await db.post.findMany();
        return postitems;
    }
    catch {
        return null;
    }
};

export const LoadPostsById = async (id) => {
    try {
        const postitem = await db.post.findUnique({
            where: { id },
            include: {
                type_publication: true,
                // author: true, // убрано за ненадобностью
            },
        });
        return postitem;
    }
    catch {
        return null;
    }
};
