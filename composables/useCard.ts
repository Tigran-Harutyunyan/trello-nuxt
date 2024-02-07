import { useClerkProvide } from 'vue-clerk';
import type { ListWithCards } from "@/types"
import type { Board } from "@prisma/client";
import { toast } from 'vue-sonner';

export const useCard = () => {
    const { state } = useClerkProvide();

    const isLoadingBoard = ref(false);

    const isCreating = ref(false);

    const route = useRoute();

    if (!(route.params?.id && state.organization?.id)) {
        throw Error("missing params")
    }

    interface IupdateParams {
        id: string
        boardId: string
        title: string
    }

    interface IcreateParams {
        listId: string
        title: string
    }

    const updateCard = async (params: IupdateParams) => {
        const { id, boardId, title } = params;
        try {
            const response = await $fetch('/api/list/update?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    boardId,
                    id,
                    title
                },
            });

            if (response?.id) {
                toast.success(`Renamed to "${title}"`);
            }
        } catch (e) {

        } finally {
            isLoadingBoard.value = false
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
            }
        } catch (e) {
            // TODO: handle errors
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

    const deleteCard = async () => {
        let url = `/api/board?boardId=${route.params.id}&orgId=${state.organization?.id}`;

        const response = await $fetch(url, {
            method: "delete",
        });
    }


    return {
        createCard,
        updateCardOrder,
        isCreating
    }
}