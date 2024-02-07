import prisma from "../../../../../libs/prismadb";
import { ENTITY_TYPE } from "@prisma/client";
export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { orgId } = getQuery(event)
    const { cardId } = event.context.params

    if (!(auth.userId && orgId)) return;

    try {

        const auditLogs = await prisma.auditLog.findMany({
            where: {
                orgId,
                entityId: cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
        });

        return auditLogs;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
