<script setup lang="ts">
import { CreditCard } from "lucide-vue-next";
import { useClerkProvide } from "vue-clerk";
import InfoSkeleton from "./InfoSkeleton.vue";
const { isClerkLoaded, state } = useClerkProvide();

interface InfoProps {
  isPro: boolean;
}
const { isPro } = defineProps<InfoProps>();
</script>

<template>
  <InfoSkeleton v-if="!isClerkLoaded" />
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
