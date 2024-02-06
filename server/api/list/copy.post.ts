import prisma from "../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        id, boardId, orgId
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    let list;

    const listToCopy = await prisma.list.findUnique({
        where: {
            id,
            boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: true,
        },
    });

    if (!listToCopy) {
        return { error: "List not found" };
    }

    const lastList = await prisma.list.findFirst({
        where: { boardId },
        orderBy: { order: "desc" },
        select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prisma.list.create({
        data: {
            boardId: listToCopy.boardId,
            title: `${listToCopy.title} - Copy`,
            order: newOrder,
            cards: {
                createMany: {
                    data: listToCopy.cards.map((card) => ({
                        title: card.title,
                        description: card.description,
                        order: card.order,
                    })),
                },
            },
        },
        include: {
            cards: true,
        },
    });

    await createAuditLog({
        entityTitle: list.title,
        entityId: list.id,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.CREATE,
        orgId,
        user
    });

    return list;

});

