<script setup lang="ts">
import { User2, HelpCircle } from "lucide-vue-next";
import BoardListSkeleton from "@/components/dashboard/organizations/BoardListSkeleton.vue";
import { useBoards } from "@/composables/useBords";
import { useSubscription } from "@/composables/useSubscription";
import { useCount } from "@/composables/useCount";
import Hint from "@/components/Hint.vue";
import FormPopover from "@/components/ui/form/FormPopover.vue";
import { MAX_FREE_BOARDS } from "@/constants/boards";

interface Iboard {
  id: string;
  title: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
}

const { isLoadingBoards, boards, getBoards } = useBoards();
const { checkSubscription, isPro } = useSubscription();
const { getAvailableCount, availableCount } = useCount();

onMounted(async () => {
  getBoards();
  getAvailableCount();
  checkSubscription();
});
</script>

<template>
  <BoardListSkeleton v-if="isLoadingBoards" />
  <div class="space-y-4" v-else>
    <div class="flex items-center font-semibold text-lg text-neutral-700">
      <User2 class="h-6 w-6 mr-2" />
      Your boards
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <template v-if="!isLoadingBoards && boards && boards.length">
        <NuxtLink
          v-for="board in boards"
          :key="board.id"
          :to="`/board/${board.id}`"
          class="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          :style="{ backgroundImage: `url(${board.imageThumbUrl})` }"
        >
          <div
            class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"
          />
          <p class="relative font-semibold text-white">
            {{ board.title }}
          </p>
        </NuxtLink>
      </template>

      <FormPopover :sideOffset="10" side="right">
        <div
          role="button"
          class="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
        >
          <p class="text-sm">Create new board</p>
          <span class="text-xs">
            {{
              isPro
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - availableCount} remaining`
            }}
          </span>
          <Hint
            :sideOffset="40"
            side="bottom"
            description=" Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
          >
            <HelpCircle class="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
      </FormPopover>
    </div>
  </div>
</template>
