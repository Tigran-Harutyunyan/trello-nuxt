import prisma from "../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const {
        orgId,
        title,
        id
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) return;

    const user = await clerkClient.users.getUser(auth.userId);

    let board;

    try {

        board = await prisma.board.update({
            where: {
                id,
                orgId,
            },
            data: {
                title,
            },
        });

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.UPDATE,
            orgId,
            user
        });
        return board;

    } catch (error: any) {
        return {
            error: "Failed to delete."
        }
    }

});
