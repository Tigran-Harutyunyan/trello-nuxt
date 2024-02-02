<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import NavItemSkeleton from "./NavItemSkeleton.vue";
import NavItem from "./NavItem.vue";
import { useStorage } from "@vueuse/core";
import { useClerkProvide, useClerk } from "vue-clerk";

const { derivedState } = useClerkProvide();
const { getOrganizationMemberships } = useClerk();
const userMemberships = await getOrganizationMemberships();

const STORAGE_KEY = "t-sidebar-state";
const expanded = useStorage(STORAGE_KEY, "{}", localStorage);
const parsedExpanded = JSON.parse(expanded.value);

const defaultAccordionValue: string[] = Object.keys(parsedExpanded).reduce(
  (acc: string[], key: string) => {
    if (parsedExpanded && parsedExpanded[key]) {
      acc.push(key);
    }
    return acc;
  },
  []
);

const onExpand = (orgId: string) => {
  if (orgId in parsedExpanded) {
    parsedExpanded[orgId] = !parsedExpanded[orgId];
  } else {
    parsedExpanded[orgId] = true;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedExpanded));
};

//isLoadedOrg || !isLoadedOrgList ||
</script>

<template>
  <template v-if="!userMemberships">
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
        :isExpanded="!!expanded[mem.organization.id]"
        :organization="mem.organization"
        @onExpand="onExpand"
      />
    </Accordion>
  </template>
</template>
