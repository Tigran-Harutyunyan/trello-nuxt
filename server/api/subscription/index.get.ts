import prisma from "@/libs/prismadb";

export default defineEventHandler(async (event) => {
    const DAY_IN_MS = 86_400_000;

    const { auth } = event.context;

    const queryParams = getQuery(event)

    if (!(auth.userId && queryParams.orgId)) return;

    try {

        const orgSubscription = await prisma.orgSubscription.findUnique({
            where: {
                orgId: queryParams.orgId as string,
            },
            select: {
                stripeSubscriptionId: true,
                stripeCurrentPeriodEnd: true,
                stripeCustomerId: true,
                stripePriceId: true,
            },
        });

        if (!orgSubscription) {
            return false;
        }

        const isValid =
            orgSubscription.stripePriceId &&
            orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

        return !!isValid;

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error
        });
    }

});
