import prisma from "@/libs/prismadb";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const {
        items, orgId
    } = body;

    const { auth } = event.context;

    if (!(auth.userId && orgId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    let updatedCards;

    try {

        const transaction = items.map((card) =>
            prisma.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId,
                        },
                    },
                },
                data: {
                    order: card.order,
                    listId: card.listId,
                },
            }),
        );

        updatedCards = await prisma.$transaction(transaction);

        return updatedCards

    } catch (error: any) {
        return {
            error: "Failed to reorder."
        }
    }

});