<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import { Button } from "@/components/ui/button";
</script>

<template>
  <div
    class="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center"
  >
    <div
      class="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between"
    >
      <Logo />
      <div
        class="space-x-4 md:block md:w-auto flex items-center justify-between w-full"
      >
        <Button size="sm" variant="outline" as-child>
          <NuxtLink to="/sign-in"> Login </NuxtLink>
        </Button>
        <Button size="sm" as-child>
          <NuxtLink to="/sign-up"> Get Taskify for free </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
