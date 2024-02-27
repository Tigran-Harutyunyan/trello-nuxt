import prisma from "@/libs/prismadb";

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const { id } = event.context.params;

    const { orgId } = getQuery(event);

    if (!(auth.userId && orgId)) return;

    try {

        const card = await prisma.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId: orgId as string,
                    },
                },
            },
            include: {
                list: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return card;

    } catch (error: any) {
        return {
            error: "Failed to get the card."
        }
    }
});