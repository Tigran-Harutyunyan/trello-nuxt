<script setup lang="ts">
import { format } from "date-fns";
import { type AuditLog } from "@prisma/client";

import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

const { data } = defineProps<ActivityItemProps>();
</script>

<template>
  <li class="flex items-center gap-x-2">
    <Avatar class="h-8 w-8">
      <AvatarImage :src="data.userImage" />
    </Avatar>
    <div class="flex flex-col space-y-0.5">
      <p class="text-sm text-muted-foreground">
        <span class="font-semibold lowercase text-neutral-700">
          {{ data.userName }}
        </span>
        {{ generateLogMessage(data) }}
      </p>
      <p class="text-xs text-muted-foreground">
        {{ format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a") }}
      </p>
    </div>
  </li>
</template>
