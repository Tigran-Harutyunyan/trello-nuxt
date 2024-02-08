<script setup lang="ts">
interface LoadingProps {
  width?: number;
  height?: number;
}
const { width, height } = withDefaults(defineProps<LoadingProps>(), {
  width: 120,
  height: 120,
});
</script>
<template>
  <div class="h-screen w-full flex flex-col justify-center items-center">
    <NuxtImg
      src="/logo.svg"
      alt="Logo"
      :width="`${width}px`"
      :height="`${height}px`"
      class="animate-pulse duration-700"
    />
  </div>
</template>
