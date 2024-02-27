import prisma from "@/libs/prismadb";

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { orgId } = getQuery(event)

    if (!(auth.userId && orgId)) return;

    try {

        const orgLimit = await prisma.orgLimit.findUnique({
            where: { orgId: orgId as string }
        });

        if (orgLimit) {
            await prisma.orgLimit.update({
                where: { orgId: orgId as string },
                data: { count: orgLimit.count + 1 }
            });
        } else {
            await prisma.orgLimit.create({
                data: { orgId: orgId as string, count: 1 }
            });
        }

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});

