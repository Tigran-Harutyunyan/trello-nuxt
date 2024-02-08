<script setup lang="ts">
import { type CardWithList } from "@/types";
import { Copy, Trash } from "lucide-vue-next";
import { useCard } from "@/composables/useCard";

const emit = defineEmits(["close"]);

const { copyCard, deleteCard, isLoadingCopy, isLoadingDelete } = useCard();
interface ActionsProps {
  data: CardWithList;
}

const { data } = defineProps<ActionsProps>();
const { onCreateCard, onDeleteCard } = inject("board");

const onCopy = async () => {
  const res = await copyCard(data.id);
  if (res?.id) {
    onCreateCard(res);
  }
};

const onDelete = async () => {
  const res = await deleteCard(data.id);
  if (res?.id) {
    emit("close");
    onDeleteCard(res);
  }
};
</script>

<template>
  <div class="space-y-2 mt-2">
    <p class="text-xs font-semibold">Actions</p>
    <Button
      @click="onCopy"
      :disabled="isLoadingCopy"
      variant="gray"
      class="w-full justify-start"
      size="inline"
    >
      <Copy class="h-4 w-4 mr-2" />
      {{ isLoadingCopy ? "Copying..." : "Copy" }}
    </Button>
    <Button
      @click="onDelete"
      :disabled="isLoadingDelete"
      variant="gray"
      class="w-full justify-start"
      size="inline"
    >
      <Trash class="h-4 w-4 mr-2" />
      {{ isLoadingDelete ? "Deleting..." : "Delete" }}
    </Button>
  </div>
</template>
