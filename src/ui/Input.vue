<template>
  <div>
    <div :class="[
      width,
      height,
      'text-[12px]',
      'flex items-center overflow-hidden transition-all duration-200',
      borderRadius,
      variantClasses.backgroundColor,
      variantClasses.borderColor,
      variantClasses.shadow,
      isRingVisible && 'focus-within:ring-1 focus-within:ring-[#0096c7]',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      iconPosition === 'after' ? 'flex-row-reverse' : '',
    ]">
      <div v-if="iconComponent" :class="[
        'flex items-center justify-center px-3',
        variant !== 'without-border' && iconPosition === 'before'
          ? 'border-r border-gray-300'
          : '',
        variant !== 'without-border' && iconPosition === 'after'
          ? 'border-l border-gray-300'
          : '',
      ]">
        <component :is="iconComponent" :size="20" class="text-gray-400" />
      </div>
      <input ref="inputRef" :type="inputType" :value="modelValue" @focus="handleFocus" :placeholder="placeholder"
        :disabled="disabled" :readonly="isReadonly" autocomplete="new-password" autocorrect="off" autocapitalize="off"
        spellcheck="false" data-form-type="other" data-lpignore="true" :class="[
          'flex-1 px-4 py-0 text-[12px] placeholder:text-[12px] text-gray-800 outline-none bg-transparent w-[calc(100%-44px)]',
          'placeholder-gray-400',
        ]" />

      <div v-if="clearable && modelValue" type="button" @click="clearValue"
        class="px-2 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
        <X class="w-4 h-4" />
      </div>
      <div v-if="props.type === 'password'" @click="togglePassword"
        class="px-2 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
        <Eye v-if="showPassword" class="w-4 h-4" />
        <EyeOff v-else class="w-4 h-4" />
      </div>
    </div>
    <p v-if="error" class="mt-1 text-xs text-red-500/80">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, } from 'vue'
import type { FunctionalComponent, SVGAttributes } from 'vue'
import { X, Eye, EyeOff } from 'lucide-vue-next'

export type InputVariant = 'filled' | 'outlined' | 'without-border'

interface InputVariantProperties {
  backgroundColor: string
  borderColor: string
  shadow: string
}

export interface CustomInputProps {
  modelValue: string
  placeholder?: string
  variant?: InputVariant
  iconComponent?: FunctionalComponent<SVGAttributes>
  iconPosition?: 'before' | 'after'
  disabled?: boolean
  type?: string
  width?: string
  isRingVisible?: boolean
  height?: string
  borderRadius?: string
  error?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<CustomInputProps>(), {
  placeholder: '',
  variant: 'filled',
  iconPosition: 'before',
  disabled: false,
  type: 'text',
  width: 'w-[200px]',
  height: 'h-[34px]',
  isRingVisible: true,
  borderRadius: 'rounded',
  error: '',
  clearable: false,
})

const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const variantClasses = computed<InputVariantProperties>(() => {
  const variants = {
    filled: {
      backgroundColor: 'bg-white',
      borderColor: 'border border-gray-300',
      shadow: '',
    },
    outlined: {
      backgroundColor: 'bg-transparent',
      borderColor: 'border-2 border-gray-400',
      shadow: 'shadow-none',
    },
    'without-border': {
      backgroundColor: 'bg-white',
      borderColor: 'border-none',
      shadow: 'shadow-none',
    },
  }
  return variants[props.variant]
})

// password
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const isReadonly = ref(true)

const handleFocus = () => {
  isReadonly.value = false
}


const clearValue = () => {
  emit('update:modelValue', '')
  if (inputRef.value) inputRef.value.focus()
}
</script>

<style scoped></style>
