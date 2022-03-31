<template>
  <canvas ref="canvasElement" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { random } from 'lodash'
import { Stage } from '~~/types'

const canvasElement = ref(null)
const stage: Stage = {
  canvas: null,
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  composer: null,
  geometry: null,
  particle: null,
}

const initStage = () => {
  stage.canvas = canvasElement.value

  stage.scene = new THREE.Scene()
  stage.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  stage.camera.position.z = 12
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

const addLights = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight()
  ambientLight.color = new THREE.Color(0xeeeeee)
  ambientLight.intensity = 0.5
  stage.scene.add(ambientLight)

  // 点光源
  const spotLight = new THREE.SpotLight(0xe91e63, 0.5, 10, Math.PI * 0.1, 0.25, 1)
  spotLight.position.set(0, 2, 3)
  stage.scene.add(spotLight)
}

const addComposer = () => {
  stage.composer = new EffectComposer(stage.renderer)
  stage.composer.addPass(new RenderPass(stage.scene, stage.camera))
  stage.composer.addPass(new AfterimagePass())

  stage.composer.setSize(window.innerWidth, window.innerHeight)
}

const addGeometry = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshNormalMaterial({
    color: 0xffffff,
    flatShading: true,
  })
  stage.geometry = new THREE.Mesh(geometry, material)
  stage.scene.add(stage.geometry)

  const mesh2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 1),
    new THREE.MeshNormalMaterial({
      flatShading: true,
      transparent: true,
      opacity: 0.3,
    }),
  )
  stage.scene.add(mesh2)
}

const addParticle = () => {
  const count = 500
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    flatShading: true,
  })
  const group = new THREE.Group()
  const distance = 10
  for (let i = 0; i < count; i++) {
    const item = new THREE.Mesh(new THREE.SphereGeometry(0.01, 10, 10), material)
    item.position.set(
      random(-distance, distance, true),
      random(-distance, distance, true),
      random(-distance, distance, true),
    )

    group.add(item)
  }
  stage.particle = group
  stage.scene.add(group)
}

const tick = () => {
  window.requestAnimationFrame(tick)

  stage.geometry.rotation.x += 0.01
  stage.geometry.rotation.y += 0.01

  stage.particle.rotation.x -= 0.0001
  stage.particle.rotation.y -= 0.0001
  stage.particle.rotation.z += 0.0001

  stage.controls.update()
  stage.composer.render()
  // stage.renderer.render(stage.scene, stage.camera)
}

onMounted(() => {
  initStage()
  addControls()
  addLights()
  addGeometry()
  addParticle()
  addComposer()

  tick()
})
</script>
