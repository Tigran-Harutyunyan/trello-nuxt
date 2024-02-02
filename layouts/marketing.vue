<script setup lang="ts">
import Footer from "@/components/marketing/Footer.vue";
import Navbar from "@/components/marketing/Navbar.vue";
</script>
<template>
  <div class="h-screen bg-slate-100">
    <Navbar />
    <main class="pt-40 pb-20 bg-slate-100">
      <NuxtPage> <slot /></NuxtPage>
    </main>
    <Footer />
  </div>
</template>
