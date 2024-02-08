<script setup lang="ts">
import { type AuditLog } from "@prisma/client";
import ActivityItem from "~/components/ActivityItem.vue";
import { ActivityIcon } from "lucide-vue-next";

interface ActivityProps {
  items: AuditLog[];
}
const { items } = defineProps<ActivityProps>();
</script>

<template>
  <div class="flex items-start gap-x-3 w-full">
    <ActivityIcon class="h-5 w-5 mt-0.5 text-neutral-700" />
    <div class="w-full">
      <p class="font-semibold text-neutral-700 mb-2">Activity</p>
      <ol class="mt-2 space-y-4">
        <ActivityItem v-for="item in items" :key="item.id" :data="item" />
      </ol>
    </div>
  </div>
</template>
