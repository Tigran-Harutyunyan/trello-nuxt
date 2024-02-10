<script setup lang="ts">
import { useStripeAPI } from "@/composables/useStripeAPI";
import { useMainStore } from "@/store/store";

const { isPro } = storeToRefs(useMainStore());
const { openProModal } = useMainStore();

const isLoading = ref(false);

const { stripeRedirect } = useStripeAPI();

const onClick = async () => {
  if (isPro.value) {
    const { data } = await stripeRedirect();
    window.location.href = data;
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
