<script setup lang="ts">
import { type List } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, X } from "lucide-vue-next";
import { PopoverClose } from "radix-vue";
import FormSubmit from "@/components/ui/form/FormSubmit.vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useList } from "@/composables/useList";

const { copyList, deleteList } = useList();

const { updateBoard } = inject("board");

const emit = defineEmits(["onAddCard"]);

interface ListOptionsProps {
  data: List;
}

const { data } = defineProps<ListOptionsProps>();

const closeRef = ref();

const onDelete = async () => {
  closeRef.value.$el.click();
  await deleteList({ id: data.id, boardId: data.boardId });
  updateBoard();
};

const onCopy = async () => {
  closeRef.value.$el.click();
  await copyList({ id: data.id, boardId: data.boardId });
  updateBoard();
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="h-auto w-auto p-2" variant="ghost">
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="px-0 pt-3 pb-3" side="bottom" align="start">
      <div class="text-sm font-medium text-center text-neutral-600 pb-4">
        List actions
      </div>
      <PopoverClose ref="closeRef" as-child>
        <Button
          class="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          variant="ghost"
        >
          <X class="h-4 w-4" />
        </Button>
      </PopoverClose>
      <Button
        @click="$emit('onAddCard')"
        class="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        variant="ghost"
      >
        Add card...
      </Button>
      <form @submit.prevent="onCopy">
        <FormSubmit
          variant="ghost"
          class="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Copy list...
        </FormSubmit>
      </form>
      <Separator />
      <form @submit.prevent="onDelete">
        <FormSubmit
          variant="ghost"
          class="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this list
        </FormSubmit>
      </form>
    </PopoverContent>
  </Popover>
</template>
