<script setup lang="ts">
import { Medal } from "lucide-vue-next";
import Footer from "@/components/marketing/Footer.vue";
import Navbar from "@/components/marketing/Navbar.vue";

import { useClerkProvide } from "vue-clerk";
const { derivedState } = useClerkProvide();

definePageMeta({
  isPublicRoute: true,
  //isMarketingRoute: true,
  middleware: "auth",
});

const router = useRouter();

const isAuth = computed(() => {
  return !!derivedState.value?.userId;
});
</script>

<template>
  <div class="h-screen bg-slate-100">
    <Navbar :isAuth="isAuth" />
    <main class="pt-40 pb-20 bg-slate-100">
      <div class="flex items-center justify-center flex-col">
        <div class="flex items-center justify-center flex-col font-local">
          <!-- headingFont.class, -->
          <div
            class="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase"
          >
            <Medal class="h-6 w-6 mr-2" />
            No 1 task managment
          </div>
          <h1 class="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
            Taskify helps team move
          </h1>
          <div
            class="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit"
          >
            work forward.
          </div>
        </div>
        <div
          class="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto font-poppins"
        >
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is unique -
          accomplish it all with Taskify.
        </div>
        <Button class="mt-6" size="lg" as-child v-if="!isAuth">
          <NuxtLink to="/sign-up"> Get Taskify for free </NuxtLink>
        </Button>

        <Button
          size="lg"
          class="mt-6"
          @click="router.push(`/organization/${derivedState.organization?.id}`)"
          v-if="derivedState.organization?.id"
        >
          Boards
        </Button>
      </div>
    </main>
    <Footer />
  </div>
</template>
