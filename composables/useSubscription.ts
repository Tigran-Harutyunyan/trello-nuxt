export const useSubscription = () => {
    const checkSubscription = async (orgId: string) => {
        try {
            return await $fetch(
                `/api/subscription?orgId=${orgId}`,
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