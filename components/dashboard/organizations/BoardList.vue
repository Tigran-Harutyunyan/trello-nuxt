<script setup lang="ts">
import { User2, HelpCircle } from "lucide-vue-next";
import { Skeleton } from "@/components/ui/skeleton";
import Hint from "@/components/Hint.vue";
import FormPopover from "@/components/ui/form/FormPopover.vue";
import OrgControl from "~/components/dashboard/organizations/OrgControl.vue";

import { useBoard } from "@/composables/useBoard";

import { MAX_FREE_BOARDS } from "@/constants/boards";

import { useMainStore } from "@/store/store";

const { isPro, availableCount } = storeToRefs(useMainStore());

interface Iboard {
  id: string;
  title: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
}

const isLoadingBoards = ref(true);

const boards = ref<Iboard[]>();

const { getBoards } = useBoard();

const initBoardsRequest = async (orgId: string) => {
  isLoadingBoards.value = true;

  const response = await getBoards(orgId);

  if (Array.isArray(response)) {
    boards.value = response as Iboard[];
  }

  isLoadingBoards.value = false;
};
</script>

<template>
  <div
    v-if="isLoadingBoards"
    class="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
    <Skeleton class="aspect-video h-full w-full p-2" />
  </div>
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
      <ClientOnly>
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
      </ClientOnly>
    </div>
  </div>
  <OrgControl @change="(id) => initBoardsRequest(id)" />
</template>
