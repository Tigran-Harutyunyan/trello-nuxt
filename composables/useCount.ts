

import { useClerkProvide } from 'vue-clerk'

export const useCount = () => {
    const { state } = useClerkProvide();
    const isLoadingCount = ref(false);

    const availableCount = ref();

    const getAvailableCount = async () => {

        isLoadingCount.value = true;
        try {
            const response = await $fetch(
                `/api/count/availablecount?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );

            if (typeof response === "number") { availableCount.value = response; }
        } catch (e) {

        } finally {
            isLoadingCount.value = false
        }
    }

    const decreaseAvailableCount = async () => {
        isLoadingCount.value = true;
        try {
            const response = await $fetch(
                `/api/count/decreaseAvailableCount?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );


        } catch (e) {

        } finally {
            isLoadingCount.value = false
        }
    }

    const incrementAvailableCount = async () => {
        isLoadingCount.value = true;
        try {
            const response = await $fetch(
                `/api/count/incrementAvailableCount?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );


        } catch (e) {

        } finally {
            isLoadingCount.value = false
        }
    }

    const hasAvailableCount = async () => {
        isLoadingCount.value = true;
        try {
            const response = await $fetch(
                `/api/count/incrementAvailableCount?orgId=${state.organization?.id}`,
                {
                    method: "get",
                }
            );


        } catch (e) {

        } finally {
            isLoadingCount.value = false
        }
    }

    return {
        getAvailableCount,
        isLoadingCount,
        availableCount
    }
}