<script setup lang="ts">
import { Container, Draggable } from "vue3-smooth-dnd";

import type { ListWithCards, IdropResult } from "@/types";
import CardForm from "./CardForm.vue";
import CardItem from "./CardItem.vue";
import ListHeader from "./ListHeader.vue";
import { useMainStore } from "@/store/store";

const { openCardModal, setPendingCard } = useMainStore();

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

const emit = defineEmits(["columnRearrange", "onDropToSibling"]);

const { data, index } = defineProps<ListItemProps>();

const inputRef = ref();

const isEditing = ref(false);

const currentDrugEnter = ref();

const disableEditing = () => {
  isEditing.value = false;
};

const enableEditing = () => {
  isEditing.value = true;
  setTimeout(() => {
    if (inputRef.value) inputRef.value?.focus();
    if (inputRef.value) inputRef.value?.select();
  });
};

const gePayload = (index: number) => {
  return data.cards[index];
};

const onDrop = (dropResult: IdropResult, index: number) => {
  const { addedIndex, removedIndex } = dropResult;
  if (addedIndex === null && removedIndex === null) return;

  if (addedIndex !== null && removedIndex === null) {
    // Item being droped on another column;
    emit("onDropToSibling", {
      dropIndex: currentDrugEnter.value,
      dropResult,
    });
    return;
  }

  if (addedIndex === removedIndex) {
    // Dummy movement within column
    return;
  }

  // Do rearrangment within column
  emit("columnRearrange", {
    dropResult,
    columnIndex: index,
  });
};

const dragEnter = (_, index: number) => {
  // Set start column index for future transformation.
  currentDrugEnter.value = index;
};

const showModal = (id: string) => {
  setPendingCard(id);
  openCardModal();
};
</script>

<template>
  <ListHeader @onAddCard="enableEditing" :data="data" />
  <Container
    group-name="group"
    orientation="vertical"
    :get-child-payload="gePayload"
    @drop="onDrop($event, index)"
    @dragEnter="dragEnter($event, index)"
  >
    <Draggable
      v-for="(card, index) in data.cards"
      :key="card.id"
      :list="data.cards"
    >
      <ol
        class="mx-1 px-1 py-0.5 flex flex-col gap-y-2"
        :class="data.cards.length > 0 && index === 0 ? 'mt-2' : 'mt-1'"
      >
        <CardItem
          class="column-drag-handle2"
          :index="index"
          :data="card"
          @open="showModal"
        />
      </ol>
    </Draggable>
  </Container>
  <div :class="{ 'mt-2': data.cards.length }">
    <CardForm
      :listId="data.id"
      ref="inputRef"
      :isEditing="isEditing"
      @enableEditing="enableEditing"
      @disableEditing="disableEditing"
    />
  </div>
</template>

<style scoped>
.sortable-chosen:hover,
.animated.smooth-dnd-draggable-wrapper .column-drag-handle2 {
  border-color: transparent !important;
}
</style>
