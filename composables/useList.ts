import { useClerkProvide } from 'vue-clerk';
import { toast } from 'vue-sonner';

interface Iparams {
    id: string
    boardId: string
    title: string
}

interface Ilist {
    boardId: string
    title: string
}

interface IlistCopy {
    boardId: string
    id: string
}

export const useList = () => {
    const { state } = useClerkProvide();

    const isLoadingBoard = ref(false);
    const isCreatingList = ref(false);

    const route = useRoute();

    if (!(route.params?.id && state.organization?.id)) {
        throw Error("missing params")
    }

    const updateList = async (params: Iparams) => {
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

    const createList = async (params: Ilist) => {

        const { boardId, title } = params;

        isCreatingList.value = true;

        try {
            const response = await $fetch('/api/list/create?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    boardId,
                    title
                },
            });

            if (response?.id) {
                toast.success(`List "${title}" created"`);
                return response
            }
        } catch (error) {
            return error;
        } finally {
            isCreatingList.value = false;
        }
    }

    const copyList = async (params: IlistCopy) => {
        const { boardId, id } = params;
        try {
            const response = await $fetch('/api/list/copy?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    boardId,
                    id
                },
            });

            if (response?.id) {
                toast.success(`List copied."`);
                return response
            }
        } catch (error) {
            return error;
        } finally {
            isLoadingBoard.value = false
        }
    }

    const deleteList = async (params) => {
        const { id, boardId } = params;
        let url = `/api/list/delete?id=${id}&boardId=${boardId}&orgId=${state.organization?.id}`;

        try {
            const response = await $fetch(url, {
                method: "delete",
            });

            if (response?.id) {
                toast.success(`List ${response?.title} deleted."`);
                return response;
            }
        } catch (error) {
            return error
        }

    }

    const updateOrderList = async (params) => {
        const { items, boardId } = params;
        try {
            const response = await $fetch('/api/list/update-order?', {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    boardId,
                    items
                },
            });

            if (response && Array.isArray(response)) {
                toast.success(`Rearranged  the items"`);
                return response;
            }
        } catch (e) {

        } finally {
            isLoadingBoard.value = false
        }
    }

    return {
        updateList,
        createList,
        copyList,
        deleteList,
        updateOrderList,
        isCreatingList,
    }
}