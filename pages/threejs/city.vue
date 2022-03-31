<template>
  <canvas ref="canvasElement" />
</template>

<script setup>
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer, EffectPass, BloomEffect, RenderPass, KernelSize } from 'postprocessing/module'
import { loadFBXModel, loadGLTFModel } from '~~/libs/utils/three'

const canvasElement = ref(null)

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/map.png')

const clock = new THREE.Clock()
let debug = null
const debugParams = {
  camera: 'Default',
}
const cameraFolder = []
const initDebug = () => {
  debug = new dat.GUI()
  debug.add(debugParams, 'camera', ['Default', 'Model Camera'])
}

const stage = {
  canvas: null,
  scene: null,
  camera: null,
  light: null,
  renderer: null,
  controls: null,
  mixer: null,
  composer: null,
  model: {
    camera: null,
  },
  timer: {
    old: 0,
  },
}
const initStage = () => {
  stage.canvas = canvasElement.value

  stage.scene = new THREE.Scene()
  const camera = (stage.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
  cameraFolder.push(camera)
  stage.camera.position.set(20, 20, 20)
  stage.renderer = new THREE.WebGLRenderer({
    canvas: stage.canvas,
    antialias: true,
  })
  stage.renderer.physicallyCorrectLights = true
  stage.renderer.outputEncoding = THREE.sRGBEncoding
  stage.renderer.setClearColor(0x000000)
  stage.renderer.setPixelRatio(window.devicePixelRatio)
  stage.renderer.setSize(window.innerWidth, window.innerHeight)
}
const addLight = () => {
  const ambientLight = new THREE.AmbientLight(0x333333, 2)
  stage.scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0x675c78, 1)
  directionalLight.position.set(1, 0, 1)
  stage.light = directionalLight
  // stage.scene.add(directionalLight)
}
const addControls = () => {
  stage.controls = new OrbitControls(stage.camera, stage.canvas)
  // stage.controls.enableDamping = true
  // stage.controls.maxDistance = 60

  const axesHelper = new THREE.AxesHelper(150)
  // stage.scene.add(axesHelper)
}
const addComposer = () => {
  stage.composer = new EffectComposer(stage.renderer)

  stage.composer.addPass(new RenderPass(stage.scene, stage.camera))

  // glitch
  // const glitchEffect = new GlitchEffect()
  // glitchEffect.duration.x = 1
  // glitchEffect.duration.y = 1
  // glitchEffect.delay.x = 5
  // glitchEffect.delay.y = 5
  // const glitchPass = new EffectPass(stage.camera, glitchEffect)
  // glitchPass.goWild = true
  // stage.composer.addPass(glitchPass)

  // bloom
  const bloomEffect = new BloomEffect({
    kernelSize: KernelSize.HUGE,
    luminanceThreshold: 0.01,
    luminanceSmoothing: 0.2,
    intensity: 1, // 发光强度
  })
  const bloomPass = new EffectPass(stage.camera, bloomEffect)
  stage.composer.addPass(bloomPass)
  stage.composer.setSize(window.innerWidth, window.innerHeight)
}
const loadModel = async () => {
  const model = await loadFBXModel('/models/test1.fbx')
  console.log(model)
  window.model = model

  // const modelScene = model.scene
  // modelScene.scale.set(0.8, 0.8, 0.8)
  // modelScene.traverse(obj => {
  //   if (obj instanceof THREE.Mesh) {
  //     console.log(obj)
  //     obj.material = new THREE.MeshStandardMaterial({
  //       map: colorTexture,
  //     })
  //     console.log(obj.material.color)
  //   }
  // })

  // const modelBox = new THREE.Box3().setFromObject(modelScene)
  // const size = modelBox.getSize(new THREE.Vector3()).length()
  // const center = modelBox.getCenter(new THREE.Vector3())

  // modelScene.position.x += modelScene.position.x - center.x
  // modelScene.position.y += (modelScene.position.y - center.y) / 2
  // modelScene.position.z += modelScene.position.z - center.z

  // stage.scene.rotation.y = -Math.PI * 0.5

  // const camera = stage.camera
  // camera.updateProjectionMatrix()
  // camera.position.copy(center)
  // camera.position.x += size / 3.0
  // camera.position.y += size / 10.0
  // camera.position.z += size / 3.0
  // camera.lookAt(center)

  stage.scene.add(model)

  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0xffffff,
  // })
  // const mesh = new THREE.Mesh(geometry, material)
  // mesh.position.y = 10
  // stage.scene.add(mesh)

  // const camera = model.cameras[0]
  // const helper = new THREE.CameraHelper(camera)
  // stage.scene.add(helper)
  // stage.mixer = new THREE.AnimationMixer(camera)
  // const clip = model.animations[0]
  // stage.mixer.clipAction(clip).reset().play()
  // stage.model.camera = camera
  // cameraFolder.push(camera)

  updateStage()
}
const updateStage = () => {
  window.requestAnimationFrame(updateStage)

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - stage.timer.old
  stage.timer.old = elapsedTime

  stage.light.position.copy(stage.camera.position)
  stage.controls.update()
  // stage.mixer.update(deltaTime)
  debugParams.camera === 'Default' ? stage.composer.render() : stage.renderer.render(stage.scene, stage.model.camera)
  // stage.renderer.render(stage.scene, stage.camera)
  // stage.renderer.render(stage.scene, stage.model.camera)
}

const resizeHandler = () => {
  // get size
  const width = window.innerWidth
  const height = window.innerHeight
  const aspect = width / height

  // Update camera
  stage.camera.aspect = aspect
  stage.camera.updateProjectionMatrix()
  stage.model.camera.aspect = aspect
  stage.model.camera.updateProjectionMatrix()

  // Update renderer
  stage.renderer.setSize(width, height)
  stage.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

onMounted(() => {
  initStage()
  initDebug()
  addLight()
  addControls()
  loadModel()
  addComposer()

  // updateStage()

  window.addEventListener('resize', resizeHandler)
})
</script>
