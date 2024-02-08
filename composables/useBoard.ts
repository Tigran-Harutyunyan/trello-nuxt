import { useClerkProvide } from 'vue-clerk';

export const useBoard = () => {
    const { state } = useClerkProvide();

    const orgId = state.organization?.id;

    const route = useRoute();


    const getBoard = async () => {
        try {
            const url = `/api/board?boardId=${route.params.id}&orgId=${orgId}`;

            return await $fetch(url, {
                method: "get",
            });

        } catch (error) {
            return error
        }
    }

    const getBoardList = async () => {

        const url = `/api/board?boardId=${route.params.id}&orgId=${orgId}&isList=true`;

        try {
            return await $fetch(url, {
                method: "get",
            });

        } catch (error) {
            return error
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

    const getBoards = async (orgId: string) => {
        try {
            return await $fetch(`/api/boards?orgId=${orgId}`, {
                method: "get",
            });
        } catch (error) {
            return error
        }
    }

    const createBoard = async (params) => {
        try {

            return await $fetch(`/api/board?`, {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    ...params
                },
            });

        } catch (e) {
            return e
        }
    }

    return {
        getBoard,
        deleteBoard,
        updateBoard,
        getBoardList,
        getBoards,
        createBoard
    }
}