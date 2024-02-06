<script setup lang="ts">
import { X, Plus } from "lucide-vue-next";
import FormTextarea from "@/components/ui/form/FormTextarea.vue";
import FormSubmit from "@/components/ui/form/FormSubmit.vue";
import { useCard } from "@/composables/useCard";
import { onClickOutside } from "@vueuse/core";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
}
const { listId, isEditing } = defineProps<CardFormProps>();
const emit = defineEmits(["enableEditing", "disableEditing"]);

const { updateBoard } = inject("board");

const inputRef = ref();

const title = ref("");

const { createCard, isCreating } = useCard();

const fieldErrors = ref();

const target = ref();

onClickOutside(target, (event) => emit("disableEditing"));

const onSubmit = async () => {
  if (!title.value) {
    emit("disableEditing");
    return;
  }
  // Update DB.
  await createCard({
    title: title.value,
    listId,
  });

  emit("disableEditing");
  updateBoard();
};

const onChange = (text: string) => {
  if (typeof text === "string") {
    title.value = text;
  }
};

const onBlur = () => {};

const focus = () => {
  if (inputRef.value) inputRef.value?.focus();
};

const select = () => {
  if (inputRef.value) inputRef.value?.select();
};

defineExpose({
  focus,
  select,
});

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("disableEditing");
    title.value = "";
  }
};
</script>

<template>
  <form
    v-if="isEditing"
    @submit.prevent="onSubmit"
    @keydown="onKeyDown"
    ref="target"
    class="m-1 py-0.5 px-1 space-y-4"
  >
    <FormTextarea
      id="title"
      @change="onChange"
      @blur="onBlur"
      ref="inputRef"
      placeholder="Enter a title for this card..."
      :errors="fieldErrors"
    />

    <div class="flex items-center gap-x-1">
      <FormSubmit variant="primary">
        {{ isCreating ? "Adding..." : "Add card" }}
      </FormSubmit>
      <Button @click="emit('disableEditing')" size="sm" variant="ghost">
        <X class="h-5 w-5" />
      </Button>
    </div>
  </form>

  <Button
    v-else
    @click="emit('enableEditing')"
    class="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
    size="sm"
    variant="ghost"
  >
    <Plus class="h-4 w-4 mr-2 ml-2" />
    Add a card
  </Button>
</template>
