import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const gltfLoader = new GLTFLoader()
const fbxLoader = new FBXLoader()

export const loadGLTFModel = (url: string, loadingCallBack?: (p: any) => void) => {
  return new Promise((resolve, reject) => {
    try {
      gltfLoader.load(
        url,
        (gltf: any) => {
          resolve(gltf)
        },
        (progress: any) => {
          loadingCallBack && loadingCallBack(progress)
          // console.log((progress.loaded / progress.total) * 100 + '%')
        },
        (loadError: any) => {
          reject(loadError)
        },
      )
    } catch (error) {
      reject(error)
    }
  })
}

export const loadFBXModel = (url: string, loadingCallBack?: (p: any) => void) => {
  return new Promise((resolve, reject) => {
    try {
      fbxLoader.load(
        url,
        (fbx: any) => {
          resolve(fbx)
        },
        (progress: any) => {
          loadingCallBack && loadingCallBack(progress)
          // console.log((progress.loaded / progress.total) * 100 + '%')
        },
        (loadError: any) => {
          reject(loadError)
        },
      )
    } catch (error) {
      reject(error)
    }
  })
}
