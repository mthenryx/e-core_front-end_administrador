'use strict'

const CLOUD_NAME = 'dpt5mm8x3'
const UPLOAD_PRESET = 'Integrador-delicia-geladas'

export async function uploadParaCloudinary(file) {
    if (!file) {
        throw new Error("Arquivo não enviado")
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error?.message || `Erro no upload: ${response.status}`)
    }

    const data = await response.json()

    return data.secure_url
}