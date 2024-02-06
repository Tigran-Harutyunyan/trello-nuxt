import prisma from "../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        title, id, boardId, orgId
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    try {

        const list = await prisma.list.update({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                },
            },
            data: {
                title
            }
        })

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATE,
            orgId,
            user
        })
        return list;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});

