<script setup lang="ts">
import BoardList from "@/components/dashboard/organizations/BoardList.vue";
import Info from "@/components/dashboard/organizations/Info.vue";
import { Separator } from "@/components/ui/separator";

definePageMeta({
  layout: "organization",
  middleware: "auth",
});

const isPro = false;
</script>

<template>
  <NuxtPage />
  <div class="w-full mb-20">
    <Info :isPro="isPro" />
    <Separator class="my-4" />
    <div class="px-2 md:px-4">
      <ClientOnly>
        <BoardList />
      </ClientOnly>
    </div>
  </div>
</template>
