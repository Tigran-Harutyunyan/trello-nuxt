import prisma from "@/libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const {
        id, boardId, orgId
    } = getQuery(event);


    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    try {

        const list = await prisma.list.delete({
            where: {
                id: id as string,
                boardId: boardId as string,
                board: {
                    orgId: orgId as string,
                },
            },
        });

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.DELETE,
            orgId,
            user
        });

        return list;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});

