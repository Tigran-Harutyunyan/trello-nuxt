<script setup lang="ts">
import { Layout, Activity, Settings, CreditCard } from "lucide-vue-next";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
}

const { isExpanded, isActive, organization } = defineProps<NavItemProps>();
const emit = defineEmits(["onExpand"]);

const router = useRouter();
const routepath = computed(() => {
  return useRoute().path;
});

const routes = ref([
  {
    label: "Boards",
    icon: Layout,
    href: `/organization/${organization.id}`,
  },
  {
    label: "Activity",
    icon: Activity,
    href: `/organization/${organization.id}/activity`,
  },
  {
    label: "Settings",
    icon: Settings,
    href: `/organization/${organization.id}/settings`,
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: `/organization/${organization.id}/billing`,
  },
]);
</script>

<template>
  <AccordionItem :value="organization.id" class="border-none">
    <AccordionTrigger
      @click="() => emit('onExpand', organization.id)"
      class="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline"
      :class="{ 'bg-sky-500/10 text-sky-700': isActive && !isExpanded }"
    >
      <div class="flex items-center gap-x-2">
        <div class="w-7 h-7 relative">
          <NuxtImg
            fill
            :src="organization.imageUrl"
            alt="Organization"
            class="rounded-sm object-cover"
          />
        </div>
        <span class="font-medium text-sm">
          {{ organization.name }}
        </span>
      </div>
    </AccordionTrigger>
    <AccordionContent class="pt-1 text-neutral-700">
      <Button
        v-for="route in routes"
        :key="route.href"
        size="sm"
        @click.stop="router.push(route.href)"
        class="w-full font-normal justify-start pl-10 mb-1"
        :class="{ 'bg-sky-500/10 text-sky-700': routepath === route.href }"
        variant="ghost"
      >
        <component :is="route.icon" class="h-4 w-4 mr-2"></component>
        {{ route.label }}
      </Button>
    </AccordionContent>
  </AccordionItem>
</template>
