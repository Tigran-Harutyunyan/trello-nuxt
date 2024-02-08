import { useClerkProvide } from 'vue-clerk';
import { toast } from 'vue-sonner';

interface Iboard {
    id: string;
    title: string;
    imageId: string;
    image: string
}

type payload = Omit<Iboard, 'id'>;

export const useCreateBoard = () => {
    const { state } = useClerkProvide();

    const fieldErrors = ref();

    const isBoardCreating = ref(false);

    const router = useRouter();

    const board = ref<Iboard>();

    type boardError = {
        error: string,
        local?: boolean,
        upgrade?: boolean
    }
    const createBoard = async (params: payload) => {
        isBoardCreating.value = true;

        try {
            let response: Iboard | boardError

            response = await $fetch(`/api/board?`, {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    ...params
                },
            });

            if ('id' in response) {
                board.value = response;
                toast.success("Board created!");
                router.push(`/board/${response.id}`);
            }
            if ('error' in response) {
                toast.error(response.error);
                if (response.local) {
                    // TODO: show modal with PRO feature upgrade
                }
            }

        } catch (e) {
            fieldErrors.value = e.message
        } finally {
            isBoardCreating.value = false
        }
    }
    return {
        createBoard,
        isBoardCreating,
        board,
        fieldErrors
    }
}