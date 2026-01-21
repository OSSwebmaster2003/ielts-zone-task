<template>
  <div style="display: none;">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, useSlots, nextTick, onUpdated } from 'vue'
import { usePageHeader } from '@/composables/usePageHeader'

const props = defineProps<{
  text?: string
}>()

const slots = useSlots()
const { setPageHeader } = usePageHeader()

const extractTextFromSlot = async () => {
  await nextTick()
  const defaultSlot = slots.default?.()
  if (defaultSlot && defaultSlot.length > 0) {
    let text = ''
    
    for (const vnode of defaultSlot) {
      if (typeof vnode.children === 'string') {
        text += vnode.children
      } else if (vnode.el && vnode.el.textContent) {
        text += vnode.el.textContent
      } else if (vnode.children) {
        // Handle text nodes in children
        const children = Array.isArray(vnode.children) ? vnode.children : [vnode.children]
        for (const child of children) {
          if (typeof child === 'string') {
            text += child
          }
        }
      }
    }
    
    return text.trim()
  }
  return ''
}

const updateHeader = async () => {
  if (props.text) {
    setPageHeader(props.text)
  } else {
    const slotText = await extractTextFromSlot()
    if (slotText) {
      setPageHeader(slotText)
    }
  }
}

onMounted(() => {
  updateHeader()
})

onUpdated(() => {
  updateHeader()
})

onUnmounted(() => {
  setPageHeader('')
})
</script>
