<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/ActivityItem.vue";
import { useLogs } from "@/composables/useLogs";

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

const fetchData = async () => {
  const paramsOrgId = useRoute().params?.organizationId;
  const response = await getLogs(paramsOrgId);

  isLoading.value = false;
  if (Array.isArray(response)) {
    auditLogs.value = response;
  }
};

onMounted(() => {
  // Settimeout is need because the organization is being switched
  setTimeout(() => {
    fetchData();
  }, 300);
});
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
</template>
