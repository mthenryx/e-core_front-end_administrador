'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/bebida"

export async function getListarBebidas () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar as bebidas!")
    return response.json()
}

export async function getBuscarBebidas (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar a bebida: ${id}`)
    return response.json()
}

export async function postBebidas (bebida) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(bebida)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar uma nova bebida")
    return response.json()
}

export async function putBebidas (id, bebida, jwt) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(bebida)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar uma bebida!")
    return response.json()
}

export async function deleteBebidas(id, jwt) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar uma bebida!")
    return true
}