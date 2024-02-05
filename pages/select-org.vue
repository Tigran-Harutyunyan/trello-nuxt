<script setup lang="ts">
definePageMeta({ layout: "auth", middleware: "auth" });

import { OrganizationList } from "vue-clerk";

const appearance = {
  elements: {
    rootBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    organizationSwitcherTrigger: {
      padding: "6px",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #E5E7EB",
      justifyContent: "space-between",
      backgroundColor: "white",
    },
  },
};
</script>

<template>
  <div class="grid h-full place-items-center">
    <OrganizationList
      hidePersonal
      :appearance="appearance"
      :afterCreateOrganizationUrl="(org) => `/organization/${org.id}`"
      :afterSelectOrganizationUrl="(org) => `/organization/${org.id}`"
    />
  </div>
</template>
