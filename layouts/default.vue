<script setup lang="ts">
import { ClerkLoaded, ClerkLoading } from "vue-clerk";
import Loading from "~/components/Loading.vue";
</script>
<template>
  <ClerkLoading>
    <Loading />
  </ClerkLoading>
  <ClerkLoaded>
    <slot />
  </ClerkLoaded>
</template>
