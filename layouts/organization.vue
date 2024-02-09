<script setup lang="ts">
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
</script>
<template>
  <div class="h-full">
    <Navbar />
    <main class="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div class="flex gap-x-7">
        <div class="w-64 shrink-0 hidden md:block">
          <ClientOnly>
            <Sidebar />
          </ClientOnly>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
