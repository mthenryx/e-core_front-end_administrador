'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/marca"

export async function getListarMarcas () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar marcas!")
    return response.json()
}

export async function getBuscarMarca (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar a marca: ${id}`)
    return response.json()
}

export async function postMarca (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar uma nova marca")
    return response.json()
}

export async function putMarca (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar uma marca!")
    return response.json()
}

export async function deleteMarca (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar uma marca!")
    return true
}