<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/ActivityItem.vue";
import { useLogs } from "@/composables/useLogs";
import OrgControl from "~/components/dashboard/organizations/OrgControl.vue";

interface Log {
  id: string;
  orgId: string;
  action: string;
  entityId: string;
  entityType: string;
  entityTitle: string;
  userId: string;
  userImage: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

const { getLogs } = useLogs();

const isLoading = ref(true);
const auditLogs = ref<Log[]>([]);

const fetchData = async (orgId: string) => {
  const response = await getLogs(orgId);

  isLoading.value = false;
  if (Array.isArray(response)) {
    auditLogs.value = response;
  }
};
</script>

<template>
  <ol class="space-y-4 mt-4" v-if="isLoading">
    <Skeleton class="w-[80%] h-14" />
    <Skeleton class="w-[50%] h-14" />
    <Skeleton class="w-[70%] h-14" />
    <Skeleton class="w-[80%] h-14" />
    <Skeleton class="w-[75%] h-14" />
  </ol>
  <template v-else>
    <p
      class="hidden last:block text-xs text-center text-muted-foreground mt-2"
      v-if="!auditLogs?.length"
    >
      No activity found inside this organization
    </p>
    <template v-else>
      <ol class="space-y-4 mt-4 overflow-auto activity-list">
        <ActivityItem v-for="log in auditLogs" :key="log.id" :data="log" />
      </ol>
    </template>
  </template>
  <OrgControl @change="fetchData" />
</template>
