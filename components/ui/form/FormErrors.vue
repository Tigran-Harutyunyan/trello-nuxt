<script setup lang="ts">
import { XCircle } from "lucide-vue-next";

interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const { id, errors } = defineProps<FormErrorsProps>();
</script>

<template>
  <div
    :id="`${id}-error`"
    aria-live="polite"
    class="mt-2 text-xs text-rose-500"
  >
    <div
      v-for="error in errors?.[id]"
      key="{error}"
      class="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
    >
      <XCircle class="h-4 w-4 mr-2" />
      {{ typeof error === "object" ? error.message : error }}
    </div>
  </div>
</template>
