<template>
  <div ref="wrapElement"></div>
</template>

<script setup lang="ts">
import mojs from '@mojs/core'
import { Star } from '~~/libs/mojs/shape'

const wrapElement = ref(null)
onMounted(() => {
  const duration = 200
  const smallBurst = new mojs.Burst({
    left: 0,
    top: 0,
    count: 10,
    radius: 30,
    rotate: 'rand(30, 90)',
    children: {
      shape: 'line',
      radius: 6,
      scale: 1,
      opacity: { 1: 0, easing: 'expo.in' },
      stroke: 'black',
      strokeWidth: 1,
      strokeLinecap: 'round',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%': '100%' },
      duration,
      easing: 'quad.out',
    },
  })

  const bigBurst = new mojs.Burst({
    left: 0,
    top: 0,
    count: 'rand(2, 4)',
    radius: 40,
    rotate: 'rand(30, 90)',
    children: {
      shape: 'line',
      radius: 16,
      scale: 1,
      opacity: { 1: 0, easing: 'expo.in' },
      stroke: 'black',
      strokeWidth: 1,
      strokeLinecap: 'round',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%': '100%' },
      duration,
      easing: 'quad.out',
    },
  })

  mojs.addShape('star', Star)
  const starBurst = new mojs.Burst({
    left: 0,
    top: 0,
    count: 'rand(2, 5)',
    radius: { 12: 50 },
    children: {
      shape: 'star',
      radius: 4,
      fill: 'cyan',
      scale: { 0: 1 },
      opacity: { 1: 0, easing: 'expo.in' },
      duration,
      easing: 'quad.out',
    },
  })

  const timeline = new mojs.Timeline({ speed: 1 })
  timeline.add(smallBurst, bigBurst, starBurst)

  document.addEventListener('click', function (e) {
    smallBurst.generate().tune({ x: e.pageX, y: e.pageY })
    bigBurst.generate().tune({ x: e.pageX, y: e.pageY })
    starBurst.generate().tune({ x: e.pageX, y: e.pageY })
    timeline.replay()
  })
})
</script>

<i18n lang="yaml"></i18n>

<style></style>
