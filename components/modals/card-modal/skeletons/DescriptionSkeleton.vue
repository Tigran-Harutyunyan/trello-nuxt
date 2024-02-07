<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex items-start gap-x-3 w-full">
    <Skeleton class="h-6 w-6 bg-neutral-200" />
    <div class="w-full">
      <Skeleton class="w-24 h-6 mb-2 bg-neutral-200" />
      <Skeleton class="w-full h-[78px] bg-neutral-200" />
    </div>
  </div>
</template>
