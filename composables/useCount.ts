import { useClerkProvide } from 'vue-clerk'

export const useCount = () => {
    const { state } = useClerkProvide();
    const isLoadingCount = ref(false);

    const canCreate = ref()

    const getAvailableCount = async (orgId: string) => {
        try {
            return await $fetch(
                `/api/count/availablecount?orgId=${orgId}`,
                { method: "get" }
            );
        } catch (error) {
            return error;
        }
    }

    const hasAvailableCount = async () => {
        isLoadingCount.value = true;
        try {
            const response = await $fetch(
                `/api/count/hasAvailableCount?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );

            if (typeof response === "boolean") { canCreate.value = response; }


        } catch (e) {

        } finally {
            isLoadingCount.value = false
        }
    }

    return {
        getAvailableCount,
        hasAvailableCount,
        isLoadingCount,
        canCreate
    }
}