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

export async function postSabor (sabor, jwt) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(sabor)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo sabor")
    return response.json()
}

export async function putSabor (id, sabor, jwt) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(sabor)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar um sabor!")
    return response.json()
}

export async function deleteSabor (id, jwt) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${jwt}`
        },
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar um sabor!")
    return true
}