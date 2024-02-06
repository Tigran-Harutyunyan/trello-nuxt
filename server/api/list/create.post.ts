import prisma from "../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk'
export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        title, boardId, orgId
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
                orgId,
            },
        });

        if (!board) {
            return {
                error: "Board not found",
            };
        }

        const lastList = await prisma.list.findFirst({
            where: { boardId: boardId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        const list = await prisma.list.create({
            data: {
                title,
                boardId,
                order: newOrder,
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

        return list

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }
});