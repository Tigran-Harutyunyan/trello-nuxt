<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const {
  description,
  side = "bottom",
  sideOffset = 0,
} = defineProps<HintProps>();
</script>

<template>
  <TooltipProvider>
    <Tooltip :delayDuration="0">
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent
        class="max-w-[220px] break-words"
        :side="side"
        :side-offset="sideOffset"
      >
        <p class="capitalize text-xs">
          {{ description }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
