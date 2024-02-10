import prisma from "../../../libs/prismadb";
import Stripe from "stripe";

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;
const APP_URL = useRuntimeConfig().public.appUrl as string;

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
});

import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    const user = await clerkClient.users.getUser(auth?.userId);

    const { orgId } = getQuery(event)

    if (!(auth && orgId)) return;

    const settingsUrl = `${APP_URL}/organization/${orgId}`;

    let url = "";

    try {
        const orgSubscription = await prisma.orgSubscription.findUnique({
            where: {
                orgId: orgId as string,
            }
        });


        if (orgSubscription && orgSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: orgSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            url = stripeSession.url;
        } else {

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price_data: {
                            currency: "USD",
                            product_data: {
                                name: "Taskify Pro",
                                description: "Unlimited boards for your organization"
                            },
                            unit_amount: 2000,
                            recurring: {
                                interval: "month"
                            },
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    orgId: orgId as string,
                },
            });

            url = stripeSession.url || "";
        }
        return { data: url };

    } catch (error: any) {
        return {
            error: "Something went wrong!"
        }
    }

});
