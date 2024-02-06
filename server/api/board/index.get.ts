import prisma from "../../../libs/prismadb";

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { orgId, boardId, isList } = getQuery(event)

    if (!(auth.userId && orgId)) return;

    if (isList) {
        try {
            const lists = await prisma.list.findMany({
                where: {
                    boardId: boardId as string,
                    board: {
                        orgId: orgId as string,
                    },
                },
                include: {
                    cards: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                },
                orderBy: {
                    order: "asc",
                },
            });
            return lists
        } catch (error: any) {
            throw createError({
                statusCode: 500,
                statusMessage: error
            });
        }

    } else {
        try {
            const board = await prisma.board.findUnique({
                where: {
                    id: boardId as string,
                    orgId: orgId as string,
                }
            });

            return board

        } catch (error: any) {
            throw createError({
                statusCode: 500,
                statusMessage: error
            });
        }
    }
}); 