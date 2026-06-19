'use strict'

const url = "http://localhost:8080/v1/delicia-gelada/admin/usuario"

export async function postLoginInformacoes (usuario) {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(usuario)
    }

    const urlLogin = "http://localhost:8080/v1/delicia-gelada/admin/usuario/login"

    const response = await fetch(urlLogin, options)
    if(!response.ok) throw new Error("Erro em fazer login com as informações do usuário!")
    return response.json()
}

export async function getListarUsuario (jwt) {
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${jwt}`
        },
    }
    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao listar os usuários")
    return response.json()
}

export async function getBuscarUsuario (id, jwt) {
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${jwt}`
        },
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error(`Erro ao buscar o usuário: ${id}`)
    return response.json()
}

export async function postUsuario (usuario, jwt) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(usuario)
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error("Erro ao criar um novo usuário")
    return response.json()
}

export async function putUsuario (id, usuario, jwt) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(usuario)
    }
    const response = await fetch(`${url}/${id}`, options)
    if(!response.ok) throw new Error("Erro ao atualizar Usuário!")
    return response.json()
}

export async function deleteUsuario (id, jwt) {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${jwt}`
        },
    }

    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) throw new Error("Erro ao deletar o usuário!")
    return true
}