import prisma from "@/libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        title, orgId, listId
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);


    let card;

    try {
        const list = await prisma.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId,
                },
            },
        });

        if (!list) {
            return {
                error: "List not found",
            };
        }

        const lastCard = await prisma.card.findFirst({
            where: { listId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await prisma.card.create({
            data: {
                title,
                listId,
                order: newOrder,
            },
        });

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
            orgId,
            user
        });

        return card
    } catch (error) {
        return {
            error: "Failed to create."
        }
    }

});