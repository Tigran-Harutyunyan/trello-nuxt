<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="w-10 h-10 relative shrink-0">
      <Skeleton class="h-full w-full absolute" />
    </div>
    <Skeleton class="h-10 w-full" />
  </div>
</template>
