import { useClerkProvide } from 'vue-clerk';

import { toast } from 'vue-sonner';

export const useCard = () => {
    const { state } = useClerkProvide();

    const isLoadingCard = ref(false);

    const isLoadingLogs = ref(false);

    const isCreating = ref(false);

    const isLoadingCopy = ref(false);

    const isLoadingDelete = ref(false);

    const auditLogsData = ref();

    const route = useRoute();

    const cardData = ref();

    if (!(route.params?.id && state.organization?.id)) {
        throw Error("missing params")
    }

    interface IupdateParams {
        id: string
        title?: string
        description?: string
        orgId: string | undefined
    }

    interface IcreateParams {
        listId: string
        title: string
    }

    const updateCard = async (params: Omit<IupdateParams, 'orgId'>) => {
        const { id, title, description } = params;

        let payload: IupdateParams = {
            orgId: state.organization?.id,
            id
        }
        if (title) {
            payload.title = title
        }

        if (description) {
            payload.description = description
        }

        try {
            const response = await $fetch('/api/card/update?', {
                method: "post",
                body: payload,
            });

            if (response?.id) {
                toast.success(`Updated card`);
                return response;
            }
        } catch (error) {
            return error;
        } finally {
        }
    }

    const createCard = async (params: IcreateParams) => {
        const { listId, title } = params;

        isCreating.value = true;

        try {
            const response = await $fetch('/api/card/create?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    listId,
                    title
                },
            });

            if (response?.id) {
                toast.success(`Card  "${title}" created"`);
                return response
            }
        } catch (error) {
            return error;
        } finally {
            isCreating.value = false;
        }
    }

    const updateCardOrder = async (items) => {

        try {
            const response = await $fetch('/api/card/update-order?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    items
                },
            });

            if (Array.isArray(response)) {
                toast.success(`Cards rearranged"`);
            }
        } catch (e) {
            // TODO: handle errors
        } finally {
        }
    }

    const deleteCard = async (cardId: string) => {
        isLoadingDelete.value = true;

        let url = `/api/cards/${cardId}/delete?orgId=${state.organization?.id}`;

        try {
            const response = await $fetch(url, {
                method: "delete",
            });

            if (response?.id) {
                toast.success("Card is deleted");
                return response;
            }
        } catch (error) {
            return error;
        } finally {
            isLoadingDelete.value = false;
        }

    }

    const getCardLogs = async (id: string) => {
        let url = `/api/cards/${id}/logs?&orgId=${state.organization?.id}`;

        isLoadingLogs.value = true;

        try {
            const response = await $fetch(url, {
                method: "get",
            });

            if (response && Array.isArray(response)) {
                auditLogsData.value = response;
            }
        } catch (error) {
            return error;
        } finally {
            isLoadingLogs.value = false
        }
    }

    const getCard = async (cardId: string) => {
        let url = `/api/card/${cardId}?&orgId=${state.organization?.id}`;

        try {
            isLoadingCard.value = true;
            const response = await $fetch(url, {
                method: "get",
            });

            if (response?.id) {
                cardData.value = response;
            }
        } catch (error) {

        } finally {
            isLoadingCard.value = false;
        }
    }

    const copyCard = async (cardId: string) => {
        let url = `/api/cards/${cardId}/copy?`;

        try {
            isLoadingCopy.value = true;

            const response = await $fetch(url, {
                method: "post",
                body: {
                    orgId: state.organization?.id
                }
            });

            if (response?.id) {
                toast.success("Card is copied");
                return response;
            }
        } catch (error) {
            return error;
        } finally {
            isLoadingCopy.value = false;
        }
    }

    return {
        createCard,
        updateCardOrder,
        updateCard,
        getCardLogs,
        getCard,
        deleteCard,
        copyCard,
        isCreating,
        isLoadingCard,
        auditLogsData,
        cardData,
        isLoadingLogs,
        isLoadingDelete,
        isLoadingCopy
    }
}