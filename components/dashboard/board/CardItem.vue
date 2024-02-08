<script setup lang="ts">
import { type Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

const { data, index } = defineProps<CardItemProps>();

const emit = defineEmits(["open"]);

let moved = ref(false);

const onMouseUp = () => {
  if (!moved.value) {
    // Not moved. Show details modal
    emit("open", data.id);
  }
};
</script>

<template>
  <div
    @mouseup="onMouseUp"
    @mousedown="moved = false"
    @mousemove="moved = true"
    class="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
  >
    {{ data.title }}
  </div>
</template>

<style scoped>
.sortable-chosen:hover {
  border-color: transparent !important;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
