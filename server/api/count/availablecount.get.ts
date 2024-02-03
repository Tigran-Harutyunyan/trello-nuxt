import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { orgId } = getQuery(event)

    if (!(auth.userId && orgId)) return;

    try {

        const orgLimit = await prisma.orgLimit.findUnique({
            where: { orgId: orgId as string }
        });

        if (!orgLimit) {
            return 0;
        }

        return orgLimit.count

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});

