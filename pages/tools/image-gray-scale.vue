<template>
  <div class="py-12 flex flex-col items-center">
    <h1 class="">Select a image.</h1>
    <input type="file" class="block mb-12" @change="chooseImage" />
    <button @click="grayScale">Transfer</button>

    <canvas ref="canvasElement"></canvas>
  </div>
</template>

<script setup lang="ts">
import { getFilesFromInput, getImageSize } from '~~/libs/utils'

definePageMeta({
  layout: 'normal',
})
const image = ref<HTMLImageElement | undefined>(undefined)
const canvasElement = ref<HTMLCanvasElement | undefined>(undefined)

const reader = new FileReader()
reader.addEventListener('load', () => {
  console.log('loaded')
})

const chooseImage = async (e: Event) => {
  try {
    const canvas = canvasElement.value!
    const tmpImage = getFilesFromInput(e)[0]
    image.value = await getImageSize(tmpImage)
    // console.log(width, height)
    canvas.width = image.value.width
    canvas.height = image.value.height

    const pen = canvas.getContext('2d')!
    pen.drawImage(image.value, 0, 0)
  } catch (error) {
    console.log(error)
  }
}

const grayScale = () => {
  const canvas = canvasElement.value!
  const width = canvas.width
  const height = canvas.height
  const pen = canvas.getContext('2d')!
  const imgData = pen.getImageData(0, 0, width, height)
  const newImageData = []

  // set color to gray
  for (let i = 0, len = imgData.data.length; i < len; i += 4) {
    const average = Math.round((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3)
    newImageData[i] = newImageData[i + 1] = newImageData[i + 2] = average
    newImageData[i + 3] = 255
  }

  const newImage = pen.createImageData(width, height)
  newImage.data.set(newImageData)
  pen.putImageData(newImage, 0, 0)

  // download image
  canvas.toBlob(blob => {
    const a = document.createElement('a')
    const file = new File([blob], `${Math.random()}.jpeg`)
    a.href = URL.createObjectURL(file)
    a.download = file.name
    a.click()
  }, 'image/jpeg')
}
</script>

<i18n lang="yaml"></i18n>

<style></style>
