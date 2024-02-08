import { useClerkProvide } from 'vue-clerk'

export const useSubscription = () => {
    const { state } = useClerkProvide();
    const checkSubscription = async () => {
        try {
            return await $fetch(
                `/api/subscription?orgId=${state.organization?.id}`,
                { method: "get" }
            );
        } catch (e) {
            return e;
        }
    }
    return {
        checkSubscription
    }
}