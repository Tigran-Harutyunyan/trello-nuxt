<script setup lang="ts">
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import { useClerk, useClerkProvide } from "vue-clerk";
import ProModal from "~/components/modals/ProModal.vue";

const { state } = useClerkProvide();

const orgTitle = computed(() => {
  return state?.organization?.name
    ? `${state?.organization?.name} | Taskify`
    : "";
});

const { derivedState } = useClerkProvide();

const { setActive, getOrganizationMemberships } = useClerk();

const userMemberships = await getOrganizationMemberships();

const route = useRoute();

useHead({
  title: orgTitle,
});

watch(
  () => route,
  async () => {
    const paramsOrgId = route.params?.organizationId as string;

    const isValidOrgId = userMemberships.some(
      (mem) => mem.organization.id === paramsOrgId
    );
    if (isValidOrgId && derivedState.value?.orgId !== paramsOrgId) {
      console.log("needs change");
    }

    // if (isValidOrgId && derivedState.value?.orgId !== paramsOrgId) {
    //   setActive({
    //     organization: paramsOrgId as string,
    //   });
    // }
    // Get boards
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="h-full">
    <Navbar />
    <main class="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div class="flex gap-x-7">
        <div class="w-64 shrink-0 hidden md:block">
          <ClientOnly>
            <Sidebar />
          </ClientOnly>
        </div>
        <slot />
      </div>
    </main>
  </div>
  <ClientOnly>
    <ProModal />
  </ClientOnly>
</template>
