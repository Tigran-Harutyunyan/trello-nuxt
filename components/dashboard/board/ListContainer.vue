<script setup lang="ts">
import type { ListWithCards } from "@/types";
import { Container, Draggable } from "vue3-smooth-dnd";
import type { IdropResult } from "@/types";
import ListForm from "./ListForm.vue";
import ListItem from "./ListItem.vue";
import { useBoard } from "@/composables/useBoard";

interface ListContainerProps {
  data: ListWithCards[];
}

const { getBoard, list } = useBoard();

const { data } = defineProps<ListContainerProps>();

const orderedData = ref(data);

const updateBoard = async () => {
  // board data changed. Update
  await getBoard(true);
  if (list.value) {
    orderedData.value = list.value;
  }
};

provide("board", {
  updateBoard,
});

const onDrop = (dropResult: IdropResult) => {
  const { addedIndex, removedIndex } = dropResult;

  if (addedIndex === removedIndex) {
    return;
  }
  orderedData.value = applyDrag(orderedData.value, dropResult);
};

const getParentPayload = (index: number) => {
  return orderedData.value[index];
};

const onDropToSibling = ({
  dropResult,
  dropIndex,
}: {
  dropResult: IdropResult;
  dropIndex: number;
}) => {
  const { addedIndex, payload } = dropResult;

  if (addedIndex !== null) {
    // add to column
    if (orderedData.value[dropIndex].cards) {
      orderedData.value[dropIndex].cards.splice(addedIndex, 0, payload);
    }
  }
};

const onColumnRearrange = ({
  columnIndex,
  dropResult,
}: {
  columnIndex: number;
  dropResult: IdropResult;
}) => {
  const cards = orderedData.value[columnIndex].cards;
  orderedData.value[columnIndex].cards = applyDrag(cards, dropResult);
};

const applyDrag = (arr: any, dropResult: IdropResult) => {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};
</script>

<template>
  <div class="flex gap-3 pr-5">
    <div class="">
      <Container
        orientation="horizontal"
        group-name="lists"
        @drop="onDrop"
        :get-child-payload="getParentPayload"
      >
        <Draggable v-for="(list, i) in orderedData" :key="list.id">
          <div class="shrink-0 h-full w-[272px] select-none grabbable">
            <div class="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
              <ListItem
                :index="i"
                :data="list"
                @columnRearrange="onColumnRearrange"
                @onDropToSibling="onDropToSibling"
              />
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
    <div>
      <ListForm />
      <div class="flex-shrink-0 w-1"></div>
    </div>
  </div>
</template>
<style scoped>
.smooth-dnd-container.horizontal {
  display: flex !important;
  gap: 12px;
  height: 100%;
}
li::marker {
  content: "" !important;
}
.sortable-chosen:hover {
  border-color: transparent !important;
}
</style>
