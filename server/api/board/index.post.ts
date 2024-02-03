import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        orgId,
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
    } = body;

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
