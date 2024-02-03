<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import NavItemSkeleton from "./NavItemSkeleton.vue";
import NavItem from "./NavItem.vue";
import { useClerkProvide, useClerk } from "vue-clerk";

const { derivedState, isClerkLoaded } = useClerkProvide();
const { getOrganizationMemberships } = useClerk();
const userMemberships = await getOrganizationMemberships();

const STORAGE_KEY = "t-sidebar-state";
type storage = {
  [x: string]: boolean;
};
let parsedExpanded: storage = {};

const defaultAccordionValue = computed(() => {
  return Object.keys(parsedExpanded).reduce((acc: string[], key: string) => {
    if (parsedExpanded && parsedExpanded[key]) {
      acc.push(key);
    }
    return acc;
  }, []);
});

const onExpand = (orgId: string) => {
  if (orgId in parsedExpanded) {
    parsedExpanded[orgId] = !parsedExpanded[orgId];
  } else {
    parsedExpanded[orgId] = true;
  }
  if (process.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedExpanded));
  }
};

onMounted(() => {
  if (process.client && localStorage) {
    const data = localStorage.getItem(STORAGE_KEY);
    parsedExpanded = JSON.parse(data);
  }
});
</script>

<template>
  <!-- isLoadedOrg || !isLoadedOrgList -->
  <template v-if="!isClerkLoaded && !userMemberships.length">
    <div class="flex items-center justify-between mb-2">
      <Skeleton class="h-10 w-[50%]" />
      <Skeleton class="h-10 w-10" />
    </div>
    <div class="space-y-2">
      <NavItemSkeleton />
      <NavItemSkeleton />
      <NavItemSkeleton />
    </div>
  </template>

  <template v-else>
    <ClientOnly>
      <div class="font-medium text-xs flex items-center mb-1">
        <span class="pl-4"> Workspaces </span>
        <Button
          as-child
          type="button"
          size="icon"
          variant="ghost"
          class="ml-auto"
        >
          <NuxtLink to="/select-org">
            <Plus class="h-4 w-4" />
          </NuxtLink>
        </Button>
      </div>
      <Accordion
        type="multiple"
        :defaultValue="defaultAccordionValue"
        class="space-y-2"
      >
        <NavItem
          v-for="mem in userMemberships"
          :key="mem.organization.id"
          :isActive="derivedState?.organization?.id === mem.organization.id"
          :isExpanded="!!parsedExpanded[mem.organization.id]"
          :organization="mem.organization"
          @onExpand="onExpand"
        />
      </Accordion>
    </ClientOnly>
  </template>
</template>
