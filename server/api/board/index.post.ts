import prisma from "@/libs/prismadb";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const {
        orgId,
        title,
        image
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) return;

    const user = await clerkClient.users.getUser(auth.userId);


    const canCreate = await hasAvailableCount(orgId);
    const isPro = await checkSubscription(orgId);


    if (!canCreate && !isPro) {
        return {
            error: "You have reached your limit of free boards. Please upgrade to create more.",
            local: true,
            upgrade: true
        }
    }


    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board.",
            local: true
        };
    }

    try {

        const board = await prisma.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        })

        if (!isPro) {
            await incrementAvailableCount(orgId);
        }

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
            orgId,
            user
        });
        return board;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
