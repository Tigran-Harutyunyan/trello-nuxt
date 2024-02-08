import { useClerkProvide } from 'vue-clerk';
import type { ListWithCards } from "@/types"
import type { Board } from "@prisma/client";
import { toast } from 'vue-sonner';

export const useBoard = () => {
    const { state } = useClerkProvide();

    const isLoadingBoard = ref(false);

    const route = useRoute();

    const router = useRouter();

    const board = ref<Board>();

    const list = ref<ListWithCards[]>();

    if (!(route.params?.id && state.organization?.id)) {
        throw Error("missing params")
    }

    const getBoard = async (isList: boolean) => {

        isLoadingBoard.value = true;
        let url = `/api/board?boardId=${route.params.id}&orgId=${state.organization?.id}`;

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
        let url = `/api/board?id=${id}&orgId=${state.organization?.id}`;
        try {
            const response = await $fetch(url, {
                method: "delete",
            });

            if (response?.id) {
                toast.success(`Deleted ${response.title} board.`);
                router.push(`/organization/${state.organization?.id}`)
                return response;
            }
        } catch (error) {
            return error;
        }

    }

    return {
        getBoard,
        deleteBoard,
        isLoadingBoard,
        board,
        list
    }
}