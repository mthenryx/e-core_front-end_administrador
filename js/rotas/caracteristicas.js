'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/caracteristica"

export async function getListarCaracteristica () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar caracteristicas!")
    return response.json()
}

export async function getBuscarCaracteristica (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar a caracteristica: ${id}`)
    return response.json()
}

export async function postCaracteristica (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar uma nova caracteristica")
    return response.json()
}

export async function putCaracteristica (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar uma caracteristica!")
    return response.json()
}

export async function deleteCaracteristica (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar uma caracteristica!")
    return true
}