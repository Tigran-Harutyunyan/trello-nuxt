<script setup lang="ts">
import { z } from "zod";
import { X } from "lucide-vue-next";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { PopoverClose } from "radix-vue";
import FormInput from "./FormInput.vue";
import FormPicker from "./FormPicker.vue";
import FormSubmit from "./FormSubmit.vue";

import useValidation from "@/composables/useValidation";
import { useBoard } from "@/composables/useBoard";
import { useMainStore } from "@/store/store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { type IImage } from "@/types";

const { openProModal } = useMainStore();

const isLoading = ref(false);

const board = ref<Iboard>();

const router = useRouter();

const { createBoard } = useBoard();

const CreateBoardScheme = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short.",
    }),
  imageId: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});

const form: {
  title: null | string;
  imageId: null | string;
} = {
  title: null,
  imageId: null,
};

const { validate, errors, isValid } = useValidation(CreateBoardScheme, form);

interface Ipayload {
  title: string;
  imageId: string;
  image: string;
}

interface FormPopoverProps {
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

interface Iboard {
  id: string;
  title: string;
  imageId: string;
  image: string;
}

type payload = Omit<Iboard, "id">;

const {
  side = "bottom",
  align,
  sideOffset = 0,
} = defineProps<FormPopoverProps>();

const closeRef = ref();

const imageValues = ref("");

const onSubmit = async () => {
  await validate();

  if (typeof errors.value === null) {
    return;
  }

  isLoading.value = true;

  const payload: Ipayload = {
    ...form,
    image: imageValues.value,
  };

  let response = await createBoard(payload);

  if (response && typeof response === "object") {
    if ("id" in response) {
      board.value = response as Iboard;
      toast.success("Board created!");
      router.push(`/board/${response.id}`);
    }

    if ("error" in response) {
      interface boardError {
        error: string;
        local?: boolean;
        upgrade?: boolean;
      }

      const errorResp = response as boardError;

      toast.error(errorResp.error);

      if (errorResp.local && errorResp.upgrade) {
        // show modal with PRO feature upgrade
        openProModal();
      }
    }
  }

  isLoading.value = false;
  closeRef.value?.click();
};

const onImgSelect = (payload: IImage & { value: string }) => {
  form.imageId = payload.id;
  imageValues.value = payload.value;
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverContent
      :align="align"
      class="w-80 pt-3"
      :side="side"
      :sideOffset="sideOffset"
    >
      <div class="text-sm font-medium text-center text-neutral-600 pb-4">
        Create board
      </div>

      <PopoverClose :ref="closeRef" as-child>
        <Button
          class="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 close-btn"
          variant="ghost"
        >
          <X class="h-4 w-4" />
        </Button>
      </PopoverClose>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-4">
          <FormPicker id="image" :errors="errors" @select="onImgSelect" />
          <FormInput
            id="title"
            label="Board title"
            type="text"
            :errors="errors"
            @change="(data) => (form.title = data)"
          />
          <FormSubmit
            className="w-full"
            variant="primary"
            :disabled="isLoading"
          >
            {{ isLoading ? "Creating..." : "Create" }}
          </FormSubmit>
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>
<style scoped>
.close-btn {
  box-shadow: none !important;
}
</style>
