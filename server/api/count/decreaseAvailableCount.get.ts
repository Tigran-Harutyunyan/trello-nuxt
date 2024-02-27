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
                data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 }
            });
        } else {
            await prisma.orgLimit.create({
                data: { orgId: orgId as string, count: 1 }
            });
        }

        // return orgLimit.count

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});

