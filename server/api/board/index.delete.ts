import prisma from "../../../libs/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk';
import { decreaseAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
export default defineEventHandler(async (event) => {

    const {
        id,
        orgId
    } = getQuery(event);

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    const user = await clerkClient.users.getUser(auth.userId);

    const isPro = await checkSubscription(orgId);

    let board;

    try {

        board = await prisma.board.delete({
            where: {
                id: id as string,
                orgId: orgId as string,
            },
        });

        if (!isPro) {
            await decreaseAvailableCount(orgId);
        }

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
            orgId,
            user
        });

        return board;
    } catch (error) {
        return {
            error: "Failed to copy."
        }
    }

});