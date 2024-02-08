<script setup lang="ts">
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form/FormInput.vue";
import FormSubmit from "@/components/ui/form/FormSubmit.vue";
import ListWrapper from "./ListWrapper.vue";
import { Plus, X } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";
import { useList } from "@/composables/useList";

const { onCreateList } = inject("board");

const { createList, isCreatingList } = useList();

const route = useRoute();

const isEditing = ref(false);

const inputRef = ref();

const title = ref();

const target = ref(null);

const enableEditing = () => {
  isEditing.value = true;
  setTimeout(() => {
    inputRef.value?.focus();
  });
};

onClickOutside(target, (event) => disableEditing());

const disableEditing = () => {
  isEditing.value = false;
};

const onSubmit = async () => {
  if (isCreatingList.value) return;

  if (!title.value || isCreatingList.value) {
    disableEditing();
    return;
  }

  // Update DB.
  const res = await createList({
    title: title.value,
    boardId: route.params.id as string,
  });

  title.value = "";
  disableEditing();
  if (res?.id) {
    onCreateList(res);
  }
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

const onBlur = () => {
  onSubmit();
};
</script>

<template>
  <ListWrapper v-if="isEditing">
    <form
      ref="target"
      @submit.prevent="onSubmit"
      @keydown="onKeyDown"
      class="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
    >
      <FormInput
        ref="inputRef"
        id="title"
        @change="onChange"
        @blur="onBlur"
        class="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
        placeholder="Enter list title..."
      />
      <div class="flex items-center gap-x-1">
        <FormSubmit variant="primary">
          {{ isCreatingList ? "Adding..." : "Add list" }}
        </FormSubmit>
        <Button @click="isEditing = false" size="sm" variant="ghost">
          <X class="h-5 w-5" />
        </Button>
      </div>
    </form>
  </ListWrapper>

  <ListWrapper v-else>
    <button
      @click.prevent.stop="enableEditing"
      class="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
    >
      <Plus class="h-4 w-4 mr-2" />
      Add a list
    </button>
  </ListWrapper>
</template>
