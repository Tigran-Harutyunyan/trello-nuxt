<script setup lang="ts">
import { type Board } from "@prisma/client";
import BoardTitleForm from "./BoardTitleForm.vue";
import BoardOptions from "./BoardOptions.vue";

interface BoardNavbarProps {
  data: Board;
}

const { data } = defineProps<BoardNavbarProps>();
</script>

<template>
  <div
    class="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white"
  >
    <BoardTitleForm :data="data" />
    <div class="ml-auto">
      <BoardOptions :id="data?.id" />
    </div>
  </div>
</template>
