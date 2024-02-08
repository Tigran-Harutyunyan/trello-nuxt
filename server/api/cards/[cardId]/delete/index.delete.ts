import prisma from "../../../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const { orgId } = getQuery(event);

    const { cardId } = event.context.params;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    let card;

    try {
        card = await prisma.card.delete({
            where: {
                id: cardId as string,
                list: {
                    board: {
                        orgId: orgId as string,
                    },
                },
            },
        });

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETE,
            orgId,
            user
        });

        return card;

    } catch (error: any) {
        return {
            error: "Failed to delete."
        }
    }
});

