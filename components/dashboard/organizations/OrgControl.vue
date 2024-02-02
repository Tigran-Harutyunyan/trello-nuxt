<template></template>
<script setup lang="ts">
// TODO: switch organization on url paste

//   import { useClerk, useClerkProvide, useAuth } from "vue-clerk";

//   const { derivedState } = useClerkProvide();

//   const { setActive, getOrganizationMemberships, organization } = useClerk();
//   const { isLoaded } = useAuth();

//   const userMemberships = await getOrganizationMemberships();

//   const route = useRoute();

// watchEffect(() => {
//   if (isLoaded) {
//     if (organization?.id !== route.params?.organizationId) {
//       const isValidOrgId = userMemberships.some(
//         (mem) => mem.organization.id === route.params?.organizationId
//       );
//       console.log(derivedState?.value?.orgId);
//       console.log(isValidOrgId);

//       if (isValidOrgId) {
//         setActive({
//           organization: route.params?.organizationId as string,
//         });
//       }
//     }
//   }
// });
</script>
