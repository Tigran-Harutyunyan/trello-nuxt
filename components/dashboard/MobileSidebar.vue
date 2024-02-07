<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar.vue";
import { useMainStore } from "@/store/store";

const { onOpenSidebar } = useMainStore();
const { isSidebarOpen } = storeToRefs(useMainStore());
</script>

<template>
  <Button
    @click="onOpenSidebar"
    class="block md:hidden mr-2"
    variant="ghost"
    size="sm"
  >
    <Menu class="h-4 w-4" />
  </Button>
  <Sheet v-model:open="isSidebarOpen">
    <SheetContent side="left" class="p-2 pt-10">
      <Sidebar storageKey="t-sidebar-mobile-state" />
    </SheetContent>
  </Sheet>
</template>
