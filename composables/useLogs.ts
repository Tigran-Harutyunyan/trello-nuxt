export const useLogs = () => {
    const getLogs = async (orgId: string) => {

        try {
            const response = await $fetch(`/api/organization/logs?orgId=${orgId}`, {
                method: "get",
            });

            return response

        } catch (error) {
            return error
        }

    }
    return {
        getLogs,
    }
}