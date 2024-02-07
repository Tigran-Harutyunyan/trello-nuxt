import prisma from "../../../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        orgId,
    } = body;

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

        const cardToCopy = await prisma.card.findUnique({
            where: {
                id: cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });

        if (!cardToCopy) {
            return { error: "Card not found" }
        }

        const lastCard = await prisma.card.findFirst({
            where: { listId: cardToCopy.listId },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await prisma.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                order: newOrder,
                listId: cardToCopy.listId,
            },
        });

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
            orgId,
            user
        });

        return card
    } catch (error) {
        return {
            error: "Failed to copy."
        }
    }

});