<template>
  <div @drop.prevent="dropHandler" @dragenter.prevent="dragIn" @dragleave.prevent="dragOut" @dragover.prevent="dragIn">
    <slot v-bind="{ dragging }"></slot>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { getFilesFromInput } from '~~/libs/utils'
import { preventDefault } from '~~/libs/utils/event'
const emit = defineEmits(['files-dropped'])

const dragging = ref(false)
const dragIn = () => {
  dragging.value = true
}
const dragOut = () => {
  dragging.value = false
}
const dropHandler = e => {
  dragOut()
  emit('files-dropped', ...getFilesFromInput(e))
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
onMounted(() => {
  events.forEach(eventName => {
    document.body.addEventListener(eventName, preventDefault)
  })
})
onUnmounted(() => {
  events.forEach(eventName => {
    document.body.removeEventListener(eventName, preventDefault)
  })
})
</script>
