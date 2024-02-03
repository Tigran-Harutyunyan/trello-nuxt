<script setup lang="ts">
import { X } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "radix-vue";
import { z } from "zod";
import FormInput from "./FormInput.vue";
import FormPicker from "./FormPicker.vue";
import FormSubmit from "./FormSubmit.vue";

import useValidation from "@/composables/useValidation";
import { useSubscription } from "@/composables/useSubscription";
import { useCount } from "@/composables/useCount";
import { useCreateBoard } from "@/composables/useCreateBoard";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { type IImage } from "@/types";

const { checkSubscription, isPro } = useSubscription();
const { hasAvailableCount, canCreate } = useCount();
const { createBoard, isBoardCreating } = useCreateBoard();

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

const form = {
  title: null,
  imageId: null,
};

const { validate, errors, isValid, getError, scrolltoError } = useValidation(
  CreateBoardScheme,
  form,
  {
    mode: "lazy",
  }
);

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

const {
  side = "bottom",
  align,
  sideOffset = 0,
} = defineProps<FormPopoverProps>();

const closeRef = ref();

const imageValues = ref("");

const onSubmit = async () => {
  validate();

  if (!isValid) {
    return;
  }

  await hasAvailableCount();
  await checkSubscription();

  if (!canCreate.value && !isPro.value) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }

  const payload: Ipayload = {
    ...form,
    image: imageValues.value,
  };

  await createBoard(payload);

  // form.title = null;
  // form.imageId = null;
  closeRef.value!.click();
};

const onImgSelect = (payload: IImage) => {
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
          class="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
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
            @onBlur="(data) => (form.title = data)"
          />
          <FormSubmit className="w-full" :disabled="isBoardCreating">
            Create
          </FormSubmit>
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>
