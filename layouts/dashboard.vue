<script setup lang="ts">
import Navbar from "@/components/dashboard/Navbar.vue";
</script>

<template>
  <div class="h-full">
    <Navbar />
    <NuxtPage>
      <slot />
    </NuxtPage>
  </div>
</template>
