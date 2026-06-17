'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/usuario"

export async function postLoginInformacoes (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const urlLogin = "http://localhost:8080/v1/delicia-gelada/admin/usuario/login"

    const response = await fetch(urlLogin, options)
    if(!response.ok) throw new Error("Erro em fazer login com as informações do usuário!")
    return response.json()
}

export async function getListarUsuario () {
    const response = await fetch(url)
    if(!response.ok) throw new Error("Erro ao listar os usuários")
    return response.json()
}

export async function getBuscarUsuario (id) {
    const response = await fetch(`${url}/${id}`)
    if(!response.ok) throw new Error(`Erro ao buscar o usuário: ${id}`)
    return response.json()
}

export async function postUsuario (contato) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo usuário")
    return response.json()
}

export async function putUsuario (id, contato) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar Usuário!")
    return response.json()
}

export async function deleteUsuario (id) {
    const options = {
        method: "DELETE"
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar o usuário!")
    return true
}