<template>
  <div class="stage relative w-full h-full flex items-center justify-center">
    <div class="absolute top-12 left-1/2 flex items-center transform -translate-x-1/2">
      <NuxtLink
        to="/"
        class="py-2 px-8 mr-8 bg-black text-white rounded-lg shadow-lg shadow-light-100/20 transition duration-300 hover:(text-black bg-white)"
      >
        Home
      </NuxtLink>
      <button
        class="py-2 px-8 bg-black text-white rounded-lg shadow-lg shadow-light-100/20 transition duration-300 hover:(text-black bg-white)"
        @click="renderGrid"
      >
        Generate
      </button>
    </div>
  </div>
</template>

<script setup>
import { random, map } from '@georgedoescode/generative-utils'
import { SVG } from '@svgdotjs/svg.js'
import palettesColor from 'nice-color-palettes/500.json'
import tinyColor from 'tinycolor2'
import gsap from 'gsap'

const grid = ref(null)
const gridSize = {
  rows: 0,
  cols: 0,
  itemSize: 100,
}
const gridColors = ref([])
const background = reactive({
  inner: '#ffffff',
  outer: '#ffffff',
})
const characters = ['Z', 'K', 'S']

const getTwoColors = () => {
  const colorList = [...gridColors.value]
  const colorIndex = random(0, colorList.length - 1, true)
  const background = colorList[colorIndex]
  colorList.splice(colorIndex, 1)
  const foreground = random(colorList)

  return { foreground, background }
}

const drawCircle = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background } = getTwoColors()
  const centerX = x + blockSize / 2
  const centerY = y + blockSize / 2

  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  for (let i = 1; i <= 3; i++) {
    group
      .circle(map(3 - i, 0, 3, blockSize * 0.2, blockSize * 0.95))
      .fill(random(gridColors.value))
      .center(centerX, centerY)
  }
}

const drawPoints = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const raduis = blockSize / 6
  const rows = random(2, 3, true)
  const cols = random(2, 3, true)
  const rowsSpace = blockSize / (rows + 1)
  const colsSpace = blockSize / (cols + 1)

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      group
        .circle(raduis)
        .fill(foreground)
        .center(x + i * rowsSpace, y + j * colsSpace)
    }
  }
}

const drawMaskCircle = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const mask = grid.value.rect(blockSize, blockSize).fill('#ffffff').move(x, y)
  const maskGroup = grid.value.group()
  const offset = random([
    [0, 0, blockSize, blockSize],
    [0, blockSize, blockSize, 0],
  ])
  maskGroup
    .circle(blockSize)
    .fill(foreground)
    .center(x + offset[0], y + offset[1])
  maskGroup
    .circle(blockSize)
    .fill(foreground)
    .center(x + offset[2], y + offset[3])
  maskGroup.maskWith(mask)
  group.add(maskGroup)
}

const drawSemicircle = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const mask = grid.value.rect(blockSize, blockSize).fill('#ffffff').move(x, y)
  const maskGroup = grid.value.group()

  const position = random([
    [blockSize / 2, 0],
    [blockSize, blockSize / 2],
    [blockSize / 2, 1],
    [0, blockSize / 2],
  ])
  maskGroup
    .circle(blockSize)
    .fill(foreground)
    .center(x + position[0], y + position[1])
  maskGroup.maskWith(mask)
  group.add(maskGroup)
}

const drawHalfSquare = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const mask = grid.value.rect(blockSize, blockSize).fill('#ffffff').move(x, y)
  const maskGroup = grid.value.group()
  const seed = random(0, 1, true)
  maskGroup
    .rect(blockSize, blockSize)
    .fill(foreground)
    .move(x + (blockSize / 2) * seed, y + (blockSize / 2) * (1 - seed))
  maskGroup.maskWith(mask)
  group.add(maskGroup)
}

const drawCharacter = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const character = random(characters)
  const text = group.plain(character)
  text.font({
    family: 'Source Code Pro',
    size: blockSize,
    weight: 800,
    anchor: 'middle',
    fill: foreground,
    leading: 1,
  })
  text.center(x + blockSize / 2, y + blockSize / 2)
  text.rotate(random([0, 90, 180, 270]))
}

const drawCross = ({ x, y, scale = 1 }) => {
  const { itemSize } = gridSize
  const blockSize = scale * itemSize
  const { background, foreground } = getTwoColors()
  const group = grid.value.group()

  group.rect(blockSize, blockSize).fill(background).move(x, y)

  const crossGroup = grid.value.group()
  const width = blockSize * 0.15
  const height = blockSize * 0.6
  crossGroup
    .rect(width, height)
    .fill(foreground)
    .center(x + blockSize / 2, y + blockSize / 2)
  crossGroup
    .rect(height, width)
    .fill(foreground)
    .center(x + blockSize / 2, y + blockSize / 2)
  if (Math.random() < 0.5) {
    crossGroup.rotate(45)
  }
  group.add(crossGroup)
}

const drawShaps = [drawCircle, drawPoints, drawMaskCircle, drawSemicircle, drawHalfSquare, drawCharacter, drawCross]

const renderGrid = () => {
  // clear svg
  grid.value && grid.value.remove()

  const { itemSize } = gridSize
  const rows = (gridSize.rows = random(6, 8, true))
  const cols = (gridSize.cols = random(6, 8, true))

  grid.value = SVG()
    .addTo('.stage')
    .size('70%', '70%')
    .viewbox(`0 0 ${rows * itemSize} ${cols * itemSize}`)

  // colors
  gridColors.value = random(palettesColor)
  const mainColor = tinyColor.mix(gridColors.value[0], gridColors.value[1]).desaturate(10).toString()
  // background.inner = tinyColor(mainColor).lighten(10).toString()
  // background.outer = tinyColor(mainColor).darken(10).toString()

  gsap.to(background, {
    inner: tinyColor(mainColor).lighten(10).toString(),
    outer: tinyColor(mainColor).darken(10).toString(),
    duration: 0.5,
  })

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      renderGridItem(r, c)
    }
  }

  // big block
  const scale = random(2, 4, true)
  renderGridItem(random(0, rows - scale, true), random(0, cols - scale, true), scale)

  gsap.fromTo(
    '.stage > svg',
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    },
  )
}

const renderGridItem = (row, col, scale = 1) => {
  const { itemSize } = gridSize
  const x = itemSize * row
  const y = itemSize * col

  random(drawShaps)({
    x,
    y,
    scale,
  })
}

const initGrid = () => {
  try {
    renderGrid()
  } catch (error) {
    setTimeout(renderGrid, 30)
  }
}

onMounted(() => {
  initGrid()
})
</script>

<style>
.stage {
  background-image: radial-gradient(v-bind(background.inner) 0%, v-bind(background.outer) 100%);
}
</style>
