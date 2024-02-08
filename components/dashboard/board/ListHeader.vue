<script setup lang="ts">
import FormInput from "@/components/ui/form/FormInput.vue";
import ListOptions from "./ListOptions.vue";

import { type List } from "@prisma/client";
import { useList } from "@/composables/useList";

const emit = defineEmits(["onAddCard"]);

interface ListHeaderProps {
  data: List;
}

const { data } = defineProps<ListHeaderProps>();
const title = ref(data.title);

const inputRef = ref();
const isEditing = ref(false);

const { updateList } = useList();

const disableEditing = () => {
  isEditing.value = false;
};

const onChange = (data: string) => {
  if (typeof data === "string") title.value = data;
};

const enableEditing = () => {
  isEditing.value = true;

  setTimeout(() => {
    if (inputRef.value) inputRef.value?.focus();
    if (inputRef.value) inputRef.value?.select();
  });
};

const handleSubmit = async () => {
  if (title.value === data.title) {
    return disableEditing();
  }
  // Update DB.
  updateList({
    title: title.value,
    id: data.id,
    boardId: data.boardId,
  });
};

const onBlur = () => {
  handleSubmit();
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    disableEditing();
  }
};
</script>

<template>
  <div
    class="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2"
  >
    <form
      v-if="isEditing"
      @keydown="onKeyDown"
      @submit.prevent="handleSubmit"
      class="flex-1 px-[2px]"
    >
      <FormInput
        ref="inputRef"
        @change="onChange"
        @blur="onBlur"
        id="title"
        placeholder="Enter list title.."
        :defaultValue="title"
        classes="text-sm px-[7px] py-1 h-7 rounded font-medium border-transparent transition truncate bg-transparent focus:bg-white"
      />
      <button type="submit" hidden />
    </form>

    <div
      v-else
      @click="enableEditing"
      class="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
    >
      {{ title }}
    </div>

    <ListOptions @onAddCard="(info) => emit('onAddCard', info)" :data="data" />
  </div>
</template>
