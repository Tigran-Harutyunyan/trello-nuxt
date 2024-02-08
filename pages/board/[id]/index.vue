<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { useBoard } from "@/composables/useBoard";
import BoardNavbar from "@/components/dashboard/board/BoardNavbar.vue";
import Navbar from "@/components/dashboard/Navbar.vue";
import ListContainer from "@/components/dashboard/board/ListContainer.vue";
import type { Board } from "@prisma/client";
import type { ListWithCards } from "@/types";

definePageMeta({
  middleware: "auth",
});

const { getBoard, getBoardList } = useBoard();

const board = ref<Board>();
const list = ref<ListWithCards[]>();

const boardTitle = computed(() => {
  return board.value?.title ? `${board.value?.title} | Taskify` : "";
});

useHead({
  title: boardTitle,
});

const router = useRouter();

const { derivedState } = useClerkProvide();

if (!derivedState.value?.organization?.id) {
  router.push("/select-org");
}

const getSingleBoard = async () => {
  const response = await getBoard();
  if (response?.id) {
    board.value = response as Board;
  }
};

const getList = async () => {
  const response = await getBoardList();
  if (Array.isArray(response)) {
    list.value = response as ListWithCards[];
  }
};

onMounted(() => {
  getSingleBoard();
  getList();
});
</script>

<template>
  <div class="h-full">
    <Navbar />
    <div
      class="relative h-full bg-no-repeat bg-cover bg-center"
      :style="{ backgroundImage: `url(${board?.imageFullUrl})` }"
    >
      <BoardNavbar :data="board" v-if="board" />
      <div class="absolute inset-0 bg-black/10" />
      <main class="relative pt-28 h-full">
        <div class="p-4 h-full overflow-x-auto">
          <ListContainer
            :boardId="board?.id"
            :data="list"
            v-if="list && board"
          />
        </div>
      </main>
    </div>
  </div>
</template>
