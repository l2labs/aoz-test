<template>
  <div class="w-screen h-screen flex items-center justify-center bg-indigo-50">
    <DragWrap class="w-128 h-80 rounded-3xl p-8 bg-white shadow-xl shadow-indigo-100" @files-dropped="onDragHandler">
      <template #default="{ dragging }">
        <label for="fileUpload" class="w-full h-full cursor-pointer">
          <div
            class="w-full h-full flex flex-col items-center justify-center text-indigo-800 border-3 border-dashed transition duration-300 rounded-2xl"
            :class="{
              'bg-indigo-50 bg-opacity-50 border-indigo-300': dragging,
              'border-indigo-100': !dragging,
            }"
          >
            <span class="mb-8">Drag & Drop files here to upload</span>
            <span class="text-sm text-indigo-800 text-opacity-50 underline">Brower Files</span>
          </div>

          <input id="fileUpload" type="file" class="hidden" />
        </label>
      </template>
    </DragWrap>
  </div>
</template>

<script setup lang="ts">
const onDragHandler = file => {
  console.log(file)
}
</script>

<i18n lang="yaml"></i18n>

<style></style>
