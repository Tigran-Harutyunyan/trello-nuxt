<script setup lang="ts">
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

const {
  className,
  disabled,
  variant = "primary",
} = defineProps<FormSubmitProps>();
</script>

<template>
  <Button
    :disabled="disabled"
    type="submit"
    variant="primary"
    size="sm"
    :class="className"
  >
    <slot />
  </Button>
</template>
