import prisma from "../../../libs/prismadb";

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

    let lists;

    try {

        const transaction = items.map((list) =>
            prisma.list.update({
                where: {
                    id: list.id,
                    board: {
                        orgId,
                    },
                },
                data: {
                    order: list.order,
                },
            })
        );

        lists = await prisma.$transaction(transaction);

        return lists


    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});