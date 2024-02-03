<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormErrors from "./FormErrors.vue";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
}

const {
  id,
  label,
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue,
} = defineProps<FormTextareaProps>();

const emit = defineEmits(["onKeyDown", "onBlur", "onClick"]);
</script>

<template>
  <div class="space-y-2 w-full">
    <div class="space-y-1 w-full">
      <Label
        v-if="label"
        :for="id"
        class="text-xs font-semibold text-neutral-700"
      >
        {{ label }}
      </Label>

      <Textarea
        @onKeyDown="(e) => emit('onKeyDown', e)"
        @onBlur="(e) => emit('onBlur', e)"
        @onClick="(e) => emit('onClick', e)"
        :ref="ref"
        :required="required"
        :placeholder="placeholder"
        :name="id"
        :id="id"
        :disabled="disabled"
        :class="className"
        class="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
        aria-describedby="`${id}-error`"
        :defaultValue="defaultValue"
      />
    </div>
    <FormErrors :id="id" :errors="errors" />
  </div>
</template>
