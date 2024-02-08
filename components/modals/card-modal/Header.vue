<script setup lang="ts">
import FormInput from "~/components/ui/form/FormInput.vue";
import { Layout } from "lucide-vue-next";

import { type CardWithList } from "@/types";
import { useCard } from "@/composables/useCard";

const { updateCard } = useCard();

const { onUpdateCard } = inject("board");

interface HeaderProps {
  data: CardWithList;
}

const { data } = defineProps<HeaderProps>();

const title = ref(data.title);

const updatedTitle = ref(data.title);

const inputRef = ref();

const onChange = (data: string) => {
  if (typeof data === "string") title.value = data;
};

const onSubmit = async () => {
  if (title.value.trim() === updatedTitle.value.trim()) {
    return;
  }

  // Update DB.
  const res = await updateCard({
    title: title.value,
    id: data.id,
  });

  if (res.id) {
    updatedTitle.value = res?.title;
    onUpdateCard(res);
  }
};
</script>

<template>
  <div class="flex items-start gap-x-3 mb-6 w-full -mt-4">
    <Layout class="h-5 w-5 mt-1 text-neutral-700" />
    <div class="w-full">
      <form @submit.prevent="onSubmit">
        <FormInput
          ref="inputRef"
          @change="onChange"
          @blur="onSubmit"
          id="title"
          :defaultValue="title"
          classes="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
        />
      </form>
      <p class="text-sm text-muted-foreground">
        in list <span class="underline">{{ data?.list?.title }}</span>
      </p>
    </div>
  </div>
</template>
