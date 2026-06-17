'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/tipo_embalagem"

export async function getListarTipoEmbalagem () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar os tipos de embalagens!")
    return response.json()
}

export async function getBuscarTipoEmbalagem (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar o tipo de embalagem: ${id}`)
    return response.json()
}

export async function postTipoEmbalagem (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo tipo de embalagem")
    return response.json()
}

export async function putTipoEmbalagem (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar um tipo de embalagem!")
    return response.json()
}

export async function deleteTipoEmbalagem (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar um tipo de embalagem!")
    return true
}