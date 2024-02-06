<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar.vue";
import { useMainStore } from "@/store/store";

const { onOpenSidebar, onCloseSidebar } = useMainStore();
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
  <Sheet :open="isSidebarOpen" @onOpenTrigger="onCloseSidebar">
    <SheetContent side="left" class="p-2 pt-10">
      <SheetHeader>
        <div
          @click="onCloseSidebar"
          class="cursor-pointer absolute right-4 top-4 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-xicon w-4 h-4 text-muted-foreground"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </div>
      </SheetHeader>
      <Sidebar storageKey="t-sidebar-mobile-state" />
    </SheetContent>
  </Sheet>
</template>
