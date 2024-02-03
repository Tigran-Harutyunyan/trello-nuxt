import { useClerkProvide } from 'vue-clerk'
interface Iboard {
    id: string;
    title: string;
    imageId: string;
    imageThumbUrl: string;
    imageFullUrl: string;
    imageUserName: string;
    imageLinkHTML: string;
}

export const useCreateBoard = (params: Omit<Iboard, 'id'>) => {
    const { state } = useClerkProvide();

    const { title, imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML } = params;

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board."
        };
    }

    const isBoardCreating = ref(false);

    const board = ref<Iboard>();

    const createBoard = async () => {

        isBoardCreating.value = true;
        try {
            const response = await $fetch(`/api/board?`, {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    title,
                    imageId,
                    imageThumbUrl,
                    imageFullUrl,
                    imageUserName,
                    imageLinkHTML,
                },
            });

            if (response.id) {
                board.value = response as Iboard;
            }
        } catch (e) {

        } finally {
            isBoardCreating.value = false
        }
    }
    return {
        createBoard,
        isBoardCreating,
        board
    }
}