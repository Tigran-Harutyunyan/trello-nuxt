<script setup lang="ts">
import { useClerk, useClerkProvide } from "vue-clerk";
import { useMainStore } from "@/store/store";

const { setPro, setAvailableCount } = useMainStore();

const emit = defineEmits(["change"]);

const { derivedState } = useClerkProvide();

const { setActive, getOrganizationMemberships } = useClerk();

const userMemberships = await getOrganizationMemberships();

const route = useRoute();

const { checkSubscription } = useSubscription();
const { getAvailableCount } = useCount();

const initSubscriptionRequest = async (orgId: string) => {
  const response = await checkSubscription(orgId);

  if (typeof response === "boolean") {
    setPro(response);
  }
};

const initAvailableCountRequest = async (orgId: string) => {
  const response = await getAvailableCount(orgId);

  if (typeof response === "number") {
    setAvailableCount(response);
  }
};

watch(
  () => route,
  async () => {
    const orgId = route.params?.organizationId as string;

    const isValidOrgId = userMemberships.some(
      (mem) => mem.organization.id === orgId
    );

    if (isValidOrgId && derivedState.value?.orgId !== orgId) {
      setActive({
        organization: orgId as string,
      });
    }

    emit("change", orgId);
    initSubscriptionRequest(orgId);
    initAvailableCountRequest(orgId);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div></div>
</template>
