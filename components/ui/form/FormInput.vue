<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormErrors from "./FormErrors.vue";

const emit = defineEmits(["onBlur"]);

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  classes?: string;
  defaultValue?: string;
}

const {
  id,
  classes,
  label,
  type,
  placeholder,
  required,
  disabled,
  errors,

  defaultValue = "",
} = defineProps<FormInputProps>();

const onChange = (e: InputEvent) => {
  const val = (e.target as HTMLInputElement).value;
  emit("onBlur", val);
};
</script>

<template>
  <div class="space-y-2">
    <div class="space-y-1">
      <Label
        v-if="label"
        :for="id"
        class="text-xs font-semibold text-neutral-700"
      >
        {{ label }}
      </Label>
      <Input
        @input="onChange"
        :defaultValue="defaultValue"
        :ref="ref"
        :required="required"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
        class="text-sm px-2 py-1 h-7"
        :class="classes"
        :aria-describedby="`${id}-error`"
      />
    </div>
    <FormErrors :id="id" :errors="errors" />
  </div>
</template>
