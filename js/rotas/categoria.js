'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/categoria"

export async function getListarCategoria () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar categorias!")
    return response.json()
}

export async function getBuscarCategoria (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar a categoria: ${id}`)
    return response.json()
}

export async function postCategoria (categoria, jwt) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(categoria)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar uma nova cartegoria")
    return response.json()
}

export async function putCategoria (id, categoria, jwt) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(categoria)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar uma categoria!")
    return response.json()
}

export async function deleteCategoria (id, jwt) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar uma categoria!")
    return true
}