<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { useBoard } from "@/composables/useBoard";
import BoardNavbar from "@/components/dashboard/board/BoardNavbar.vue";
import Navbar from "@/components/dashboard/Navbar.vue";
import ListContainer from "@/components/dashboard/board/ListContainer.vue";
definePageMeta({
  middleware: "auth",
});

const { getBoard, board, list } = useBoard();

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

onMounted(async () => {
  getBoard(false);
  getBoard(true);
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
