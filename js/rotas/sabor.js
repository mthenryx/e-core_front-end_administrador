'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/sabor"

export async function getListarSabores () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar sabores!")
    return response.json()
}

export async function getBuscarSabor (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar o sabor: ${id}`)
    return response.json()
}

export async function postSabor (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo sabor")
    return response.json()
}

export async function putSabor (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar um sabor!")
    return response.json()
}

export async function deleteSabor (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar um sabor!")
    return true
}