<script setup lang="ts">
import { CreditCard } from "lucide-vue-next";
import { useClerkProvide } from "vue-clerk";

import { useMainStore } from "@/store/store";
import { Skeleton } from "@/components/ui/skeleton";
const { isClerkLoaded, state } = useClerkProvide();
const { isPro } = storeToRefs(useMainStore());
</script>

<template>
  <div class="flex items-center gap-x-4" v-if="!isClerkLoaded">
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

  <div class="flex items-center gap-x-4" v-else>
    <div class="w-[60px] h-[60px] relative">
      <NuxtImg
        fill
        :src="state.organization?.imageUrl"
        alt="Organization"
        class="rounded-md object-cover"
      />
    </div>
    <div class="space-y-1">
      <p class="font-semibold text-xl">
        {{ state.organization?.name }}
      </p>
      <div class="flex items-center text-xs text-muted-foreground">
        <CreditCard class="h-3 w-3 mr-1" />
        {{ isPro ? "Pro" : "Free" }}
      </div>
    </div>
  </div>
</template>
