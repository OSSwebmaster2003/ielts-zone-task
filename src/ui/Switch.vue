<template>
  <div :class="[
    'flex items-start',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ]">
    <button :id="id" type="button" role="switch" :aria-checked="modelValue"
      :aria-describedby="description ? `${id}-description` : undefined" :disabled="disabled" :class="trackClasses"
      @click="toggle" @keydown.space.prevent="toggle" @keydown.enter.prevent="toggle">
      <span :class="thumbClasses" aria-hidden="true" />
    </button>

    <div v-if="label || description" class="flex flex-col">
      <label v-if="label" :for="id" :class="labelClasses" class="cursor-pointer select-none">
        {{ label }}
      </label>
      <p v-if="description" :id="`${id}-description`" :class="descriptionClasses" class="select-none">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface ToggleProps {
  modelValue?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  variant: "default",
  size: "sm",
  disabled: false,
  id: () => `toggle-${Math.random().toString(36).substr(2, 9)}`,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [value: boolean];
}>();

// Variant classes
const variantClasses = {
  default: {
    track: "bg-gray-200 border-gray-300",
    trackActive: "bg-blue-600 border-blue-600",
    thumb: "bg-white border-gray-300 shadow-sm",
    thumbActive: "bg-white border-blue-600 shadow-md",
    label: "text-gray-900 font-medium",
    description: "text-gray-500",
  },
  success: {
    track: "bg-gray-200 border-gray-300",
    trackActive: "bg-green-600 border-green-600",
    thumb: "bg-white border-gray-300 shadow-sm",
    thumbActive: "bg-white border-green-600 shadow-md",
    label: "text-gray-900 font-medium",
    description: "text-gray-500",
  },
  warning: {
    track: "bg-gray-200 border-gray-300",
    trackActive: "bg-yellow-500 border-yellow-500",
    thumb: "bg-white border-gray-300 shadow-sm",
    thumbActive: "bg-white border-yellow-500 shadow-md",
    label: "text-gray-900 font-medium",
    description: "text-gray-500",
  },
  danger: {
    track: "bg-gray-200 border-gray-300",
    trackActive: "bg-red-600 border-red-600",
    thumb: "bg-white border-gray-300 shadow-sm",
    thumbActive: "bg-white border-red-600 shadow-md",
    label: "text-gray-900 font-medium",
    description: "text-gray-500",
  },
};

// Size classes
const sizeClasses = {
  sm: {
    track: "w-8 h-4 rounded-full border",
    thumb: "w-3 h-3 rounded-full border translate-x-0.5",
    thumbTranslate: "translate-x-4",
    label: "text-sm",
    description: "text-xs",
  },
  md: {
    track: "w-11 h-6 rounded-full border",
    thumb: "w-5 h-5 rounded-full border translate-x-0.5",
    thumbTranslate: "translate-x-5",
    label: "text-base",
    description: "text-sm",
  },
  lg: {
    track: "w-14 h-8 rounded-full border",
    thumb: "w-7 h-7 rounded-full border translate-x-0.5",
    thumbTranslate: "translate-x-6",
    label: "text-lg",
    description: "text-base",
  },
};

// Transition classes
const transitionClasses = {
  track: "transition-colors duration-200 ease-in-out",
  thumb: "transition-transform duration-200 ease-in-out",
};

const trackClasses = computed(() => [
  "relative inline-flex flex-shrink-0 cursor-pointer border-2 border-transparent focus:outline-none",
  sizeClasses[props.size].track,
  transitionClasses.track,
  props.modelValue
    ? variantClasses[props.variant].trackActive
    : variantClasses[props.variant].track,
  props.disabled ? "cursor-not-allowed" : "cursor-pointer",
]);

const thumbClasses = computed(() => [
  "pointer-events-none inline-block transform",
  sizeClasses[props.size].thumb,
  transitionClasses.thumb,
  props.modelValue
    ? [variantClasses[props.variant].thumbActive, sizeClasses[props.size].thumbTranslate]
    : variantClasses[props.variant].thumb,
]);

const labelClasses = computed(() => [
  sizeClasses[props.size].label,
  variantClasses[props.variant].label,
  props.disabled ? "cursor-not-allowed" : "cursor-pointer",
]);

const descriptionClasses = computed(() => [
  sizeClasses[props.size].description,
  variantClasses[props.variant].description,
]);

const toggle = () => {
  if (props.disabled) return;

  const newValue = !props.modelValue;
  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>

<style scoped></style>
