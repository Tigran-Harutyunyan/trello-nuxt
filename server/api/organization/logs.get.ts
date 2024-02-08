import prisma from "../../../libs/prismadb";
export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const queryParams = getQuery(event)

    if (!(auth.userId && queryParams.orgId)) return;

    try {

        const auditLogs = await prisma.auditLog.findMany({
            where: {
                orgId: queryParams.orgId as string,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return auditLogs;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
