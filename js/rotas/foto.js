'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/foto"

export async function getListarFotos () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar as fotos!")
    return response.json()
}

export async function getBuscarFotos (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar a foto: ${id}`)
    return response.json()
}

export async function postFoto (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar uma nova fotot")
    return response.json()
}

export async function putFoto (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar uma foto!")
    return response.json()
}

export async function deleteFoto (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar uma foto!")
    return true
}