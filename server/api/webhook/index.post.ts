import prisma from "../../../libs/prismadb";
import Stripe from "stripe";
import { defineStripeWebhook } from '@fixers/nuxt-stripe/server';

/**
 * @param event - the H3 event
 * @param stipe - the Stripe instance
 * @param stripeEvent - the Stripe Webhook event
 */

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;

const webhookSecret = useRuntimeConfig().stripeWebhookSecret

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16"
});

const webhookOptions = {
    webhookSecret,
    stripe,
}


export default defineStripeWebhook(async ({ event, stripeEvent }) => {

    if (!isMethod(event, ['POST'])) {
        setResponseStatus(event, 400)

        return { ok: false }
    }

    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    switch (stripeEvent.type) {
        case 'checkout.session.completed': {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );
            if (!session?.metadata?.orgId) {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Org ID is required"
                });
            }

            await prisma.orgSubscription.create({
                data: {
                    orgId: session?.metadata?.orgId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: subscription.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000
                    ),
                },
            });

        }
        case 'invoice.payment_succeeded': {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            await prisma.orgSubscription.update({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000,
                    ),
                },
            });
        }

        case 'customer.subscription.updated': {
            console.log(stripeEvent);

            const object = stripeEvent?.data?.object;

            if (object?.canceled_at && object?.id) {
                await prisma.orgSubscription.delete({
                    where: {
                        stripeSubscriptionId: object?.id,
                    },
                })
            }

        }

    }


    return {
        hello: 'world'
    }

}, webhookOptions); 