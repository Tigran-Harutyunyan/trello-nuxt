import { useClerkProvide } from 'vue-clerk';
import type { ListWithCards } from "@/types"
import type { Board } from "@prisma/client";


export const useBoard = () => {
    const { state } = useClerkProvide();

    const orgId = state.organization?.id;

    const isLoadingBoard = ref(false);

    const route = useRoute();

    const board = ref<Board>();

    const list = ref<ListWithCards[]>();

    if (!(route.params?.id && orgId)) {
        throw Error("missing params")
    }

    const getBoard = async (isList: boolean) => {

        isLoadingBoard.value = true;

        let url = `/api/board?boardId=${route.params.id}&orgId=${orgId}`;

        if (isList) {
            url = url + "&isList=true";
        }

        try {

            const response = await $fetch(url, {
                method: "get",
            });

            if (response?.id) {
                board.value = response as Board;
            }

            if (Array.isArray(response)) {
                list.value = response as ListWithCards[];
            }
        } catch (e) {

        } finally {
            isLoadingBoard.value = false
        }
    }

    const deleteBoard = async (id: string) => {

        let url = `/api/board?id=${id}&orgId=${orgId}`;

        try {
            const response = await $fetch(url, {
                method: "delete",
            });

            return {
                board: response,
                orgId
            }

        } catch (error) {
            return error;
        }

    }

    const updateBoard = async (title: string, id: string) => {
        try {
            return await $fetch(`/api/board/update?`, {
                method: "post",
                body: {
                    orgId: orgId,
                    title,
                    id
                },
            });

        } catch (error) {
            return error;
        }
    }

    return {
        getBoard,
        deleteBoard,
        isLoadingBoard,
        board,
        list,
        updateBoard
    }
}