export const getFilesFromInput = (e: Event) => {
  return e.target?.files || e.dataTransfer?.files
}

export const getImageSize = (imgFile: File) => {
  const image = new Image()
  image.src = URL.createObjectURL(imgFile)

  return new Promise((resolve: (image: HTMLImageElement) => void, reject) => {
    image.addEventListener('load', () => {
      resolve(image)
    })

    image.addEventListener('error', error => {
      reject(error.message)
    })
  })
}

export const copyText = async (content: string) => {
  try {
    // execCommand
    const tmpInput = document.createElement('input')
    tmpInput.setAttribute('value', content)
    document.body.appendChild(tmpInput)
    tmpInput.select()
    const status = document.execCommand('copy')
    document.body.removeChild(tmpInput)
    if (status) {
      return true
    }
    // execCommand not support
    await navigator.clipboard.writeText(content)
  } catch (error) {
    return false
  }
}
