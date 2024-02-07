<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex items-start gap-x-3 mb-6">
    <Skeleton class="h-6 w-6 mt-1 bg-neutral-200" />
    <div>
      <Skeleton class="w-24 h-6 mb-1 bg-neutral-200" />
      <Skeleton class="w-12 h-4 bg-neutral-200" />
    </div>
  </div>
</template>
