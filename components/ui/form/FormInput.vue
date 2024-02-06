<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormErrors from "./FormErrors.vue";

const emit = defineEmits(["change", "blur"]);

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

const inputRef = ref();

const onChange = (e: InputEvent) => {
  const val = (e.target as HTMLInputElement).value;
  emit("change", val);
};

const onBlur = () => {
  emit("blur");
};

const focus = () => {
  if (inputRef.value) inputRef.value?.focus();
};
const select = () => {
  if (inputRef.value) inputRef.value?.select();
};

defineExpose({
  focus,
  select,
});
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
        @blur="onBlur"
        :defaultValue="defaultValue"
        ref="inputRef"
        :required="required"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
        :class="cn('text-sm px-2 py-1 h-7', classes)"
        :aria-describedby="`${id}-error`"
      />
    </div>
    <FormErrors :id="id" :errors="errors" v-if="errors" />
  </div>
</template>
