import { useClerkProvide } from 'vue-clerk'

export const useStripeAPI = () => {
    const { state } = useClerkProvide();

    const stripeRedirect = async () => {
        try {
            return await $fetch(
                `/api/stripe-redirect?orgId=${state.organization?.id}`,
                { method: "post" }
            );
        } catch (error) {
            return error;
        }
    }

    return {
        stripeRedirect
    }
}