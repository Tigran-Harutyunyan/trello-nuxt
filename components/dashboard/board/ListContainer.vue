<script setup lang="ts">
import type { ListWithCards } from "@/types";
import type { Card } from "@prisma/client";

import { Container, Draggable } from "vue3-smooth-dnd";
import type { IdropResult } from "@/types";
import ListForm from "./ListForm.vue";
import ListItem from "./ListItem.vue";
import { useBoard } from "@/composables/useBoard";
import { useList } from "@/composables/useList";
import { useCard } from "@/composables/useCard";
import CardModal from "~/components/modals/card-modal/CardModal.vue";

interface ListContainerProps {
  data: ListWithCards[];
}

const { getBoard, list } = useBoard();

const { updateOrderList } = useList();

const { updateCardOrder } = useCard();

const { data } = defineProps<ListContainerProps>();

const orderedData = ref(data);

const updateBoard = async () => {
  // board data changed. Update
  await getBoard(true);
  if (list.value) {
    orderedData.value = list.value;
  }
};

const onCreateCard = (payload: Card) => {
  orderedData.value.forEach((list) => {
    if (list.id === payload.listId) {
      list.cards.push(payload);
    }
  });
};

const onDeleteCard = (payload: Card) => {
  orderedData.value.forEach((list) => {
    if (list.id === payload.listId) {
      const deletedIndex = list.cards.findIndex(
        (item) => item.order === payload.order
      );
      list.cards.splice(deletedIndex, 1);
    }
  });
};

const onCreateList = (payload: ListWithCards) => {
  payload.cards = [];
  orderedData.value.push(payload);
};

const onDeleteList = (payload: ListWithCards) => {
  const deleteIndex = orderedData.value.findIndex(
    (list) => list.id === payload.id
  );
  orderedData.value.splice(deleteIndex, 1);
};

const onUpdateCard = (payload: Card) => {
  orderedData.value.forEach((list) => {
    if (list.id === payload.listId) {
      const editIndex = list.cards.findIndex(
        (item) => item.order === payload.order
      );
      list.cards[editIndex] = payload;
    }
  });
};

provide("board", {
  updateBoard,
  onCreateCard,
  onDeleteCard,
  onCreateList,
  onDeleteList,
  onUpdateCard,
});

// User moves a list
const onDrop = (dropResult: IdropResult) => {
  const { addedIndex, removedIndex } = dropResult;

  if (addedIndex === removedIndex) {
    return;
  }

  orderedData.value = applyDrag(orderedData.value, dropResult);

  updateOrderList({
    boardId: useRoute().params.id,
    items: orderedData.value.map((item, index) => {
      return {
        ...item,
        order: index,
      };
    }),
  });
};

const getParentPayload = (index: number) => {
  return orderedData.value[index];
};

// user moves between columns
const onDropToSibling = ({
  dropResult,
  dropIndex,
}: {
  dropResult: IdropResult;
  dropIndex: number;
}) => {
  const { addedIndex, payload } = dropResult;

  if (addedIndex !== null) {
    if (orderedData.value[dropIndex].cards) {
      // Assign the new listId to the moved card

      payload.listId = orderedData.value[dropIndex].id;

      // Add card to the destination list
      orderedData.value[dropIndex].cards.splice(addedIndex, 0, payload);

      // Update the order for each card in the destination list
      orderedData.value[dropIndex].cards.forEach((card, idx: number) => {
        card.order = idx;
      });
      updateCardOrder(orderedData.value[dropIndex].cards);
    }
  }
};

// User rearranges cards in a list
const onColumnRearrange = ({
  columnIndex,
  dropResult,
}: {
  columnIndex: number;
  dropResult: IdropResult;
}) => {
  const cards = orderedData.value[columnIndex].cards;

  let reorderedCards = applyDrag(cards, dropResult);

  // Update the order for each card source list
  reorderedCards.forEach((card, idx: number) => {
    card.order = idx;
  });

  orderedData.value[columnIndex].cards = reorderedCards;

  if (dropResult.addedIndex !== null) {
    updateCardOrder(reorderedCards);
  }
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
    <div v-show="orderedData.length">
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
  <CardModal />
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
