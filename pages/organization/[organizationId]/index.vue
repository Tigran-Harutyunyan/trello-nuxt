<script setup lang="ts">
definePageMeta({
  layout: "organization",
  middleware: "auth",
});
</script>

<template>
  <NuxtPage />

  <!-- <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback="<BoardList.Skeleton />">
          <BoardList />
        </Suspense>
      </div>
    </div> -->

  <!-- <OrganizationSwitcher
    hidePersonal
    :appearance="appearance"
    :afterCreateOrganizationUrl="(org) => `/organization/${org.id}`"
    :afterSelectOrganizationUrl="(org) => `/organization/${org.id}`"
    afterLeaveOrganizationUrl="/select-org"
  /> -->
</template>
