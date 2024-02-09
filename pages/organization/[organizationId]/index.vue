<script setup lang="ts">
import BoardList from "@/components/dashboard/organizations/BoardList.vue";
import Info from "@/components/dashboard/organizations/Info.vue";
import { Separator } from "@/components/ui/separator";
import ProModal from "~/components/modals/ProModal.vue";

definePageMeta({
  layout: "organization",
  middleware: "auth",
});
</script>

<template>
  <NuxtPage />
  <div class="w-full mb-20">
    <ClientOnly
      ><Info />
      <Separator class="my-4" />
      <div class="px-2 md:px-4">
        <BoardList />
      </div>
      <ProModal />
    </ClientOnly>
  </div>
</template>
