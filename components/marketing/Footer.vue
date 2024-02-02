<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo.vue";
</script>

<template>
  <div class="fixed bottom-0 w-full p-4 border-t bg-slate-100">
    <div
      class="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between"
    >
      <Logo />
      <div
        class="space-x-4 md:block md:w-auto flex items-center justify-between w-full"
      >
        <Button size="sm" variant="ghost"> Privacy Policy </Button>
        <Button size="sm" variant="ghost"> Terms of Service </Button>
      </div>
    </div>
  </div>
</template>
