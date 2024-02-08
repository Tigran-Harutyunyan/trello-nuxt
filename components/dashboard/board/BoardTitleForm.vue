<script setup lang="ts">
import { type Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form/FormInput.vue";
import { toast } from "vue-sonner";
import { useBoard } from "~/composables/useBoard";
const { updateBoard } = useBoard();

interface BoardTitleFormProps {
  data: Board;
}

const { data } = defineProps<BoardTitleFormProps>();

const title = ref(data?.title);
const lastUpdatedTitle = ref(data?.title);

const isEditing = ref(false);

const inputRef = ref();

const enableEditing = () => {
  isEditing.value = true;

  setTimeout(() => {
    inputRef.value?.focus();
    inputRef.value?.select();
  });
};

const disableEditing = () => {
  isEditing.value = false;
};

const onSubmit = async () => {
  if (title.value === lastUpdatedTitle.value) {
    return disableEditing();
  }
  lastUpdatedTitle.value = title.value;

  const res = await updateBoard(title.value, data.id);

  if (res?.id) {
    toast.success(`Board "${res.title}" updated!`);
  }
};

const onBlur = () => {
  onSubmit();
  disableEditing();
};

const onChange = (text: string) => {
  if (typeof text === "string") {
    title.value = text;
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    disableEditing();
  }
};
</script>

<template>
  <form
    v-if="isEditing"
    @submit.prevent="onSubmit"
    @keydown="onKeyDown"
    class="flex items-center gap-x-2"
  >
    <FormInput
      ref="inputRef"
      id="title"
      @change="onChange"
      @blur="onBlur"
      :defaultValue="title"
      classes="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
    />
  </form>

  <Button
    v-else
    @click="enableEditing"
    variant="transparent"
    class="font-bold text-lg h-auto w-auto p-1 px-2"
  >
    {{ title }}
  </Button>
</template>
