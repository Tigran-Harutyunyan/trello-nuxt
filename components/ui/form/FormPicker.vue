<script setup lang="ts">
import { Loader2, Check } from "lucide-vue-next";

import { defaultImages } from "@/constants/images";
import FormErrors from "./FormErrors.vue";
import { type IImage } from "@/types";
const emit = defineEmits(["select"]);

const { unsplash } = useNuxtApp();

interface FormPickerProps {
  id: string;
  errors: Record<string, string[] | undefined>;
}

const { id, errors } = defineProps<FormPickerProps>();

const pending = ref(false);
const images = ref();
const isLoading = ref(true);
const selectedImageId = ref("");

const fetchImages = async () => {
  try {
    const result = await unsplash.photos.getRandom({
      collectionIds: ["317099"],
      count: 9,
    });

    if (result && result.response) {
      const newImages = result.response as Array<Record<string, any>>;
      images.value = appendValues(newImages);
    }

    if (result.type === "error") {
      // Failed to get images from Unsplash
      images.value = appendValues(defaultImages);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const appendValues = (images: IImage[]) => {
  return images.map((img) => {
    return {
      ...img,
      value: `${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`,
    };
  });
};

const setSelectedImageId = (image: IImage) => {
  selectedImageId.value = image?.id;
  if (image) {
    emit("select", image);
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div v-if="isLoading" class="p-6 flex items-center justify-center">
    <Loader2 class="h-6 w-6 text-sky-700 animate-spin" />
  </div>
  <div class="relative">
    <div class="grid grid-cols-3 gap-2 mb-2">
      <div
        v-for="image in images"
        :key="image.id"
        :class="{ 'opacity-50 hover:opacity-50 cursor-auto': pending }"
        class="cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted"
        @click="setSelectedImageId(image)"
      >
        <input
          type="radio"
          :id="id"
          :name="id"
          class="hidden"
          :checked="selectedImageId === image.id"
          :disabled="pending"
          :value="`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`"
        />
        <NuxtImg
          :src="image.urls.thumb"
          alt="Unsplash image"
          class="object-cover rounded-sm h-full w-full"
        />

        <div
          v-if="selectedImageId === image.id"
          class="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center"
        >
          <Check class="h-4 w-4 text-white" />
        </div>

        <NuxtLink
          :href="image.links.html"
          target="_blank"
          class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
        >
          {{ image.user.name }}
        </NuxtLink>
      </div>
    </div>
    <FormErrors id="imageId" :errors="errors" />
  </div>
</template>
