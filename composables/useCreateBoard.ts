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

    const fieldErrors = ref()

    const isBoardCreating = ref(false);

    const router = useRouter();

    const board = ref<Iboard>();

    const createBoard = async (params: payload) => {
        isBoardCreating.value = true;

        try {
            const response = await $fetch(`/api/board?`, {
                method: "post",
                body: {
                    orgId: state.organization?.id,
                    ...params
                },
            });

            if (response.id) {
                board.value = response as Iboard;
                toast.success("Board created!");
                router.push(`/board/${response.id}`);
            }

            // show modal with PRO feature upgrade if it has errors
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