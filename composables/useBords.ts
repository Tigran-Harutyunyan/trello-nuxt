import { useClerkProvide } from 'vue-clerk'

export const useBoards = () => {
    const { state } = useClerkProvide();
    const isLoadingBoards = ref(false);

    interface Iboard {
        id: string;
        title: string;
        imageId: string;
        imageThumbUrl: string;
        imageFullUrl: string;
        imageUserName: string;
        imageLinkHTML: string;
    }
    const boards = ref<Iboard[]>();

    const getBoards = async (orgId: string) => {

        isLoadingBoards.value = true;
        try {
            const response = await $fetch(`/api/boards?orgId=${orgId}`, {
                method: "get",
            });

            if (Array.isArray(response)) {
                boards.value = response as Iboard[];
            }
        } catch (e) {

        } finally {
            isLoadingBoards.value = false
        }
    }

    return {
        getBoards,
        isLoadingBoards,
        boards
    }
}