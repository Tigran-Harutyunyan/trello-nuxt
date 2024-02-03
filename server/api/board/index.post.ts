import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        orgId,
        title,
        image
    } = body;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board."
        };
    }

    const { auth } = event.context;

    if (!(auth.userId && orgId)) return;

    try {

        const boards = await prisma.board.create({
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

        return boards;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
