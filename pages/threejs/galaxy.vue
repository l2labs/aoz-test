<template>
  <canvas ref="canvasElement" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { random } from 'lodash'
import { Stage } from '~~/types'

const canvasElement = ref(null)
const stage: Partial<Stage> = {
  gui: null,
  canvas: null,
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  composer: null,
  geometry: null,
  material: null,
  particle: null,
}

const params = {
  count: 10000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  power: 3,
  insideColor: '#ff6030',
  outsideColor: '#3060ff',
}
const initGui = () => {
  stage.gui.add(params, 'count').min(1000).max(100000).step(100).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'radius').min(0.01).max(10).step(0.01).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'branches').min(2).max(10).step(1).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'randomness').min(0).max(2).step(0.01).onFinishChange(generateGalaxy)
  stage.gui.add(params, 'power').min(1).max(10).step(0.01).onFinishChange(generateGalaxy)
  stage.gui.addColor(params, 'insideColor').onFinishChange(generateGalaxy)
  stage.gui.addColor(params, 'outsideColor').onFinishChange(generateGalaxy)
}

const initStage = () => {
  stage.gui = new dat.GUI()
  initGui()

  stage.canvas = canvasElement.value

  stage.scene = new THREE.Scene()
  stage.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  stage.camera.position.y = 3
  stage.camera.position.z = 10
  stage.renderer = new THREE.WebGLRenderer({
    canvas: stage.canvas,
    antialias: true,
  })
  stage.renderer.setSize(window.innerWidth, window.innerHeight)
}

const addControls = () => {
  stage.controls = new OrbitControls(stage.camera, stage.canvas)
  stage.controls.enableDamping = true
}

const generateGalaxy = () => {
  // Destroy old galaxy
  if (stage.particle !== null) {
    stage.geometry.dispose()
    stage.material.dispose()
    stage.scene.remove(stage.particle)
  }

  stage.geometry = new THREE.BufferGeometry()

  const positions = new Float32Array(params.count * 3)
  const colors = new Float32Array(params.count * 3)
  const insideColor = new THREE.Color(params.insideColor)
  const outsideColor = new THREE.Color(params.outsideColor)

  for (let i = 0; i < params.count; i++) {
    const radius = random(0, params.radius, true)

    // position
    const spinAngle = radius * params.spin
    const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2
    const base = i * 3

    const randomX = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1)
    const randomY = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1)
    const randomZ = Math.pow(Math.random(), params.power) * (Math.random() < 0.5 ? 1 : -1)

    const position = {
      x: Math.cos(branchAngle + spinAngle) * radius + randomX,
      y: randomY,
      z: Math.sin(branchAngle + spinAngle) * radius + randomZ,
    }

    positions[base] = position.x
    positions[base + 1] = position.y
    positions[base + 2] = position.z

    // color
    const mixedColor = insideColor.clone()
    mixedColor.lerp(outsideColor, radius / params.radius)

    colors[base] = mixedColor.r
    colors[base + 1] = mixedColor.g
    colors[base + 2] = mixedColor.b
  }

  stage.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  stage.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  stage.material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: params.size,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })
  stage.particle = new THREE.Points(stage.geometry, stage.material)
  stage.scene.add(stage.particle)
}

const tick = () => {
  window.requestAnimationFrame(tick)

  stage.particle.rotation.y += 0.001

  stage.controls.update()
  // stage.composer.render()
  stage.renderer.render(stage.scene, stage.camera)
}

onMounted(() => {
  initStage()
  addControls()

  generateGalaxy()

  tick()
})
</script>
