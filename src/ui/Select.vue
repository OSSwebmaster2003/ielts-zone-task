<template>
  <div
    ref="selectWrapper"
    :class="[
      width,
      'relative inline-block',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
    ]"
  >
    <!-- Conditional rendering: input for searchable, button otherwise -->
    <div
      v-if="searchable"
      :class="[
        'flex items-center justify-between w-full cursor-pointer',
        'px-4 py-2',
        size,
        'transition-all duration-200 ease-in-out',
        'rounded-sm',
        background,
        variantBorderColor,
        borderless ? 'borderless-select' : '',
        'relative',
      ]"
    >
      <input
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="selectedOptionLabel || placeholder"
        :disabled="disabled"
        :class="[
          'w-[calc(100%-20px)] outline-none border-none font-medium',
          computedTextColor,
          disabled ? 'cursor-not-allowed' : 'cursor-text ',
          computedSearchTextColor,
        ]"
        @focus="handleInputFocus"
        @click.stop
      />

      <div
        v-if="clearable && modelValue"
        type="button"
        @click.stop="clearValue"
        class="absolute right-4 top-1/2 -translate-y-1/2 shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <X class="w-4 h-4" />
      </div>

      <component
        v-else
        :is="arrowIconComponent || ChevronDownIcon"
        :stroke-width="1"
        :class="[
          'ml-2 shrink-0',
          'h-4 w-4',
          computedTextColor,
          'transition-transform duration-200 ease-in-out font-medium',
          isOpen ? 'rotate-180' : '',
          'w-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer',
        ]"
        @click="toggleDropdown"
      />
    </div>

    <button
      v-else
      type="button"
      :class="[
        'flex items-center justify-between w-full cursor-pointer',
        'px-4 py-2 font-medium',
        size,
        'transition-all duration-200 ease-in-out',
        background,
        variantBorderColor,
        computedTextColor,
        borderless ? 'borderless-select' : '',
      ]"
      @click="toggleDropdown"
      :disabled="disabled"
    >
      <span :class="[computedTextColor, 'w-[calc(100%-20px)] text-left truncate, font-medium']">{{
        selectedOptionLabel || placeholder
      }}</span>

      <div
        v-if="clearable && modelValue"
        type="button"
        @click.stop="clearValue"
        class="ml-2 shrink-0 text-gray-400 hover:text-gray-600"
      >
        <X class="w-4 h-4" />
      </div>

      <component
        v-else
        :is="arrowIconComponent || ChevronDownIcon"
        :stroke-width="1"
        :class="[
          'ml-2 shrink-0',
          'h-4 w-4',
          computedTextColor,
          'transition-transform duration-200 ease-in-out font-medium',
          isOpen ? 'rotate-180' : '',
          'w-5',
        ]"
      />
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul
        v-show="isOpen"
        class="absolute w-full mt-1 bg-white border border-gray-300 shadow-lg p-1 rounded-lg max-h-60 overflow-y-auto z-10"
        role="listbox"
        tabindex="-1"
      >
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          :class="[
            'block w-full text-left cursor-pointer',
            'px-3 py-2',
            size,
            'transition-colors duration-150 ease-in-out',
            option.value === modelValue
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-800 hover:bg-gray-100',
          ]"
          @click="selectOption(option)"
          role="option"
          :aria-selected="option.value === modelValue"
        >
          {{ option.label }}
        </li>
        <li
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-sm text-gray-500"
        >
          {{
            searchable && searchQuery
              ? "No results found"
              : "No options"
          }}
        </li>
      </ul>
    </transition>
  </div>
  <p v-if="error" class="mt-1 text-xs text-red-500/80">{{ error }}</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { ChevronDown as ChevronDownIcon, X } from "lucide-vue-next"
import type { FunctionalComponent, SVGAttributes } from "vue"

// Types
export interface SelectOption {
  value: string | number
  label: string
}

export type SelectVariant = "filled" | "outlined" | "without-border"

export interface CustomSelectProps {
  modelValue: string | number | null
  options: SelectOption[]
  placeholder?: string
  variant?: SelectVariant
  disabled?: boolean
  arrowIconComponent?: FunctionalComponent<SVGAttributes>
  background?: string
  color?: string
  width?: string
  error?: string
  clearable?: boolean
  searchable?: boolean
  borderless?: boolean
  textColor?: string
  size?: string
}

const props = withDefaults(defineProps<CustomSelectProps>(), {
  placeholder: "",
  variant: "filled",
  disabled: false,
  modelValue: null,
  background: "bg-transparent",
  error: "",
  clearable: false,
  searchable: false,
  borderless: false,
  width: "w-full",
  textColor: undefined,
  size: "text-xs",
})

const isOpen = ref(false)
const selectWrapper = ref<HTMLElement | null>(null)
const searchQuery = ref("")
const searchInputRef = ref<HTMLInputElement | null>(null)

// Unique ID for this select instance
const selectId = Symbol("custom-select")

const variantBorderColor = computed(() => {
  switch (props.variant) {
    case "filled":
      return "border border-gray-300"
    case "outlined":
      return "border-2 border-gray-400"
    case "without-border":
      return "border-none"
    default:
      return "border border-gray-300"
  }
})

const selectedOptionLabel = computed(() => {
  const selected = props.options.find(
    (option) => option.value === props.modelValue
  )
  return selected ? selected.label : ""
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(query)
  )
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void
  (e: "change", value: string | number | null): void
}>()

watch(searchQuery, (newValue) => {
  if (props.searchable && newValue) {
    isOpen.value = true
  }
})

const toggleDropdown = () => {
  if (props.disabled) return

  if (!isOpen.value) {
    // Close other selects
    window.dispatchEvent(
      new CustomEvent("custom-select-open", {
        detail: selectId,
      })
    )
  }

  isOpen.value = !isOpen.value

  if (isOpen.value && props.searchable) {
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 0)
  }
}

const handleInputFocus = () => {
  if (!props.disabled && props.searchable) {
    isOpen.value = true
    window.dispatchEvent(
      new CustomEvent("custom-select-open", {
        detail: selectId,
      })
    )
  }
}

const selectOption = (option: SelectOption) => {
  emit("update:modelValue", option.value)
  emit("change", option.value)
  isOpen.value = false
  searchQuery.value = ""
}

const clearValue = () => {
  emit("update:modelValue", null)
  emit("change", null)
  isOpen.value = false
  searchQuery.value = ""
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    selectWrapper.value &&
    !selectWrapper.value.contains(event.target as Node)
  ) {
    isOpen.value = false
    searchQuery.value = ""
  }
}

// Listen for other selects opening
const handleOtherSelectOpen = (event: Event) => {
  const openedId = (event as CustomEvent).detail
  if (openedId !== selectId) {
    isOpen.value = false
    searchQuery.value = ""
  }
}

const computedTextColor = computed(() => {
  if (props.textColor) {
    return props.textColor
  }
  // If no textColor prop, use default logic based on selection
  return selectedOptionLabel.value
    ? "text-gray-800"
    : "text-gray-400"
})

const computedSearchTextColor = computed(() => {
  if (props.textColor) {
    return `placeholder:${props.textColor}`
  }
  return selectedOptionLabel.value
    ? "placeholder:text-gray-800"
    : "placeholder:text-gray-400"
})

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
  window.addEventListener("custom-select-open", handleOtherSelectOpen)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
  window.removeEventListener("custom-select-open", handleOtherSelectOpen)
})
</script>

<style scoped>
.borderless-select {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.borderless-select:hover {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.borderless-select:focus {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}

.borderless-select:active {
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}
</style>
