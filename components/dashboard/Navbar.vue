<script setup lang="ts">
import { OrganizationSwitcher, UserButton } from "vue-clerk";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import Logo from "@/components/Logo.vue";

const switcherAppearance = {
  elements: {
    rootBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

const buttonAppearance = {
  elements: {
    avatarBox: {
      height: 30,
      width: 30,
    },
  },
};
</script>

<template>
  <nav
    class="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center"
  >
    <!-- <MobileSidebar /> -->
    <div class="flex items-center gap-x-4">
      <div class="hidden md:flex">
        <Logo />
      </div>
      <!-- <FormPopover align="start" side="bottom" sideOffset="{18}"> -->
      <Button
        size="sm"
        variant="primary"
        class="rounded-sm hidden md:block h-auto py-1.5 px-2"
      >
        Create
      </Button>
      <!-- </FormPopover> -->
      <!-- <FormPopover> -->
      <Button variant="primary" size="sm" class="rounded-sm block md:hidden">
        <Plus class="h-4 w-4" />
      </Button>
      <!-- </FormPopover> -->
    </div>
    <div class="ml-auto flex items-center gap-x-2">
      <OrganizationSwitcher
        hidePersonal
        :afterCreateOrganizationUrl="(org) => `/organization/${org.id}`"
        :afterSelectOrganizationUrl="(org) => `/organization/${org.id}`"
        afterLeaveOrganizationUrl="/select-org"
        :appearance="switcherAppearance"
      />
      <UserButton afterSignOutUrl="/" :appearance="buttonAppearance" />
    </div>
  </nav>
</template>
