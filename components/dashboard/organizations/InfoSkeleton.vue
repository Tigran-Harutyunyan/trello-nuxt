<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex items-center gap-x-4">
    <div class="w-[60px] h-[60px] relative">
      <Skeleton class="w-full h-full absolute" />
    </div>
    <div class="space-y-2">
      <Skeleton class="h-10 w-[200px]" />
      <div class="flex items-center">
        <Skeleton class="h-4 w-4 mr-2" />
        <Skeleton class="h-4 w-[100px]" />
      </div>
    </div>
  </div>
</template>
