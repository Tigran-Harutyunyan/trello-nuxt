<script setup lang="ts">
import { useMainStore } from "@/store/store";
import { useStripeAPI } from "@/composables/useStripeAPI";
import { toast } from "vue-sonner";

const { stripeRedirect } = useStripeAPI();
const { isProModalOpen } = storeToRefs(useMainStore());
const { closeProModal } = useMainStore();

const isLoading = ref(false);

const onUpgrade = async () => {
  isLoading.value = true;

  const { data, error } = await stripeRedirect();

  if (data) {
    closeProModal();

    setTimeout(() => {
      window.location.href = data;
    }, 200);
  }

  if (error) {
    toast.error(error);
  }

  isLoading.value = false;
};
</script>

<template>
  <Dialog v-model:open="isProModalOpen">
    <DialogContent class="max-w-md p-0 overflow-hidden">
      <div class="aspect-video relative flex items-center justify-center">
        <NuxtImg src="/hero.svg" alt="Hero" class="object-cover" fill />
      </div>
      <div class="text-neutral-700 mx-auto space-y-6 p-6">
        <h2 class="font-semibold text-xl">Upgrade to Taskify Pro Today!</h2>
        <p class="text-xs font-semibold text-neutral-600">
          Explore the best of Taskify
        </p>
        <div class="pl-3">
          <ul class="text-sm list-disc">
            <li>Unlimited boards</li>
            <li>Advanced checklists</li>
            <li>Admin and security features</li>
            <li>And more!</li>
          </ul>
        </div>
        <Button
          :disabled="isLoading"
          @click="onUpgrade"
          class="w-full"
          variant="primary"
        >
          {{ isLoading ? "Wait..." : "Upgrade" }}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
