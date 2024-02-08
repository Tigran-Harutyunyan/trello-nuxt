<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import ActivityList from "~/components/dashboard/organizations/ActivityList.vue";
import Info from "~/components/dashboard/organizations/Info.vue";
definePageMeta({
  layout: "organization",
});
</script>

<template>
  <div class="flex flex-col w-full">
    <ClientOnly>
      <Info />
      <Separator class="my-2" />
      <ActivityList />
    </ClientOnly>
  </div>
</template>
