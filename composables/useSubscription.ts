import { useClerkProvide } from 'vue-clerk'

export const useSubscription = () => {
    const { state } = useClerkProvide();
    const isLoadingSubscription = ref(false);


    const isPro = ref(false);

    const checkSubscription = async () => {

        isLoadingSubscription.value = true;
        try {
            const response = await $fetch(
                `/api/subscription?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );

            if (typeof response === "boolean") { isPro.value = response; }
        } catch (e) {

        } finally {
            isLoadingSubscription.value = false
        }
    }
    return {
        checkSubscription,
        isLoadingSubscription,
        isPro
    }
}