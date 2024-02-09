<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import Info from "@/components/dashboard/organizations/Info.vue";
import SubscriptionButton from "@/components/dashboard/organizations/SubscriptionButton.vue";
definePageMeta({
  layout: "organization",
});
</script>

<template>
  <ClientOnly>
    <div className="w-full">
      <Info />
      <Separator class="my-2" />
      <SubscriptionButton />
    </div>
  </ClientOnly>
</template>
