import prisma from "@/libs/prismadb";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { orgId } = getQuery(event)

    if (!(auth.userId && orgId)) return;

    try {

        const orgLimit = await prisma.orgLimit.findUnique({
            where: { orgId: orgId as string }
        });

        if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
            return true;
        } else {
            return false;
        }

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
