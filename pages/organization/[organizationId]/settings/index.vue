<script setup lang="ts">
import { OrganizationProfile } from "vue-clerk";
definePageMeta({
  layout: "organization",
});
const appearance = {
  elements: {
    rootBox: {
      boxShadow: "none",
      width: "100%",
    },
    card: {
      border: "1px solid #e5e5e5",
      boxShadow: "none",
      width: "100%",
    },
  },
};
</script>

<template>
  <div class="w-full">
    <OrganizationProfile :appearance="appearance" />
  </div>
</template>
