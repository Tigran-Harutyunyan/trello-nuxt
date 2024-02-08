<script setup lang="ts">
import { type CardWithList } from "@/types";
import { AlignLeft } from "lucide-vue-next";
import FormSubmit from "~/components/ui/form/FormSubmit.vue";
import FormTextarea from "~/components/ui/form/FormTextarea.vue";

interface DescriptionProps {
  data: CardWithList;
}

const { onUpdateCard } = inject("board");

const { updateCard } = useCard();

const { data } = defineProps<DescriptionProps>();

const description = ref(data.description || "");

const updatedDescription = ref(data.description || "");

const isEditing = ref(false);

const textareaRef = ref();

const isLoading = ref(false);

const disableEditing = () => {
  isEditing.value = false;
};

const enableEditing = () => {
  isEditing.value = true;

  setTimeout(() => {
    if (textareaRef.value) textareaRef.value?.focus();
    if (textareaRef.value) textareaRef.value?.select();
  });
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    disableEditing();
  }
};

const onSubmit = async () => {
  if (description.value === updatedDescription.value) {
    return;
  }

  isLoading.value = true;
  // Update DB.
  const res = await updateCard({
    description: description.value,
    id: data.id,
  });

  isLoading.value = false;

  if (res.id) {
    updatedDescription.value = res?.description;
    onUpdateCard(res);
    disableEditing();
  }
};

const onChange = (data: string) => {
  if (typeof data === "string") description.value = data;
};
</script>

<template>
  <div class="flex items-start gap-x-3 w-full">
    <AlignLeft class="h-5 w-5 mt-0.5 text-neutral-700" />
    <div class="w-full">
      <p class="font-semibold text-neutral-700 mb-2">Description</p>

      <form
        @submit.prevent="onSubmit"
        @keydown="onKeyDown"
        class="space-y-2"
        v-if="isEditing"
      >
        <FormTextarea
          id="description"
          class="w-full mt-2"
          placeholder="Add a more detailed description"
          :defaultValue="description"
          ref="textareaRef"
          @change="onChange"
          @blur="onSubmit"
        />
        <div class="flex items-center gap-x-2">
          <FormSubmit variant="primary">
            {{ isLoading ? "Saving..." : "Save" }}
          </FormSubmit>
          <Button
            type="button"
            @click="disableEditing"
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </form>
      <div
        @click="enableEditing"
        v-else
        role="button"
        class="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
      >
        {{ updatedDescription || "Add a more detailed description..." }}
      </div>
    </div>
  </div>
</template>
