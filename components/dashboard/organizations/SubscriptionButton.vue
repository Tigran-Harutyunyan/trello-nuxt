<script setup lang="ts">
import { useMainStore } from "@/store/store";
const { isPro } = storeToRefs(useMainStore());
const { openProModal } = useMainStore();
const isLoading = ref(false);

const onClick = () => {
  if (isPro.value) {
  } else {
    openProModal();
  }
};
</script>

<template>
  <Button variant="primary" @click="onClick" :disabled="isLoading">
    {{ isPro ? "Manage subscription" : "Upgrade to pro" }}
  </Button>
</template>
