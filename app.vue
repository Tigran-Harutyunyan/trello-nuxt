<template>
  <NuxtLoadingIndicator color="#f43f5e" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>
