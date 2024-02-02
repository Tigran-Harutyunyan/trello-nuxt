<script setup lang="ts">
import { SignUp } from "vue-clerk";
definePageMeta({ layout: "auth", isPublicRoute: true });
</script>

<template>
  <div class="grid h-full place-items-center">
    <SignUp />
  </div>
</template>
