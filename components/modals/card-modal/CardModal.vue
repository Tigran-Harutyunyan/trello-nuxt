<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-vue";
import HeaderSkeleton from "./skeletons/HeaderSkeleton.vue";
import ActionsSkeleton from "./skeletons/ActionsSkeleton.vue";
import ActivitySkeleton from "./skeletons/ActivitySkeleton.vue";
import DescriptionSkeleton from "./skeletons/DescriptionSkeleton.vue";
import { useMainStore } from "@/store/store";

import Header from "./Header.vue";
import Activity from "./Activity.vue";
import Description from "./Description.vue";
import Actions from "./Actions.vue";
import { useCard } from "~/composables/useCard";

const { isCardModalOpen, pendingCardId } = storeToRefs(useMainStore());
const { resetPendingCard, closeCardModal } = useMainStore();

const {
  getCardLogs,
  auditLogsData,
  getCard,
  cardData,
  isLoadingCard,
  isLoadingLogs,
} = useCard();

watch(
  () => pendingCardId.value,
  () => {
    if (pendingCardId.value) {
      getCardLogs(pendingCardId.value);
      getCard(pendingCardId.value);
    }
  }
);

watch(
  () => isLoadingCard.value,
  (newVal) => {
    if (newVal) {
      // Reset the card id in order for other watcher to work on next open.
      resetPendingCard();
    }
  }
);
</script>

<template>
  <Dialog v-model:open="isCardModalOpen">
    <DialogContent>
      <DialogHeader class="sm:justify-start"> </DialogHeader>
      <VisuallyHidden><DialogTitle>Card</DialogTitle></VisuallyHidden>

      <HeaderSkeleton v-if="isLoadingCard" />
      <Header :data="cardData" v-else />

      <div class="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div class="col-span-3">
          <div class="w-full space-y-6">
            <DescriptionSkeleton v-if="isLoadingCard" />
            <Description :data="cardData" v-else />

            <ActivitySkeleton v-if="isLoadingLogs" />
            <Activity :items="auditLogsData" v-else />
          </div>
        </div>
        <ActionsSkeleton v-if="isLoadingCard" />
        <Actions :data="cardData" @close="closeCardModal" v-else />
      </div>
    </DialogContent>
  </Dialog>
</template>
