'use strict'

// Todos os imports

import { postLoginInformacoes } from "../rotas/usuarios.js"

// Tela de Login

window.ocultarSenha = function () {
    const senha = document.getElementById("senha")
    const olho = document.getElementById("olho")

    olho.style.opacity = "0"

    setTimeout(() => {

        if (senha.type === "password") {
            senha.type = "text"
            olho.src = "./img/Eye.png"
        } else {
            senha.type = "password"
            olho.src = "./img/Closed Eye.png"
        }

        olho.style.opacity = "1"

    }, 200)
}

function validarEmailESenha(email, senha) {
    if (email === "") {
        Swal.fire({
            title: 'Erro!',
            text: 'O campo do e-mail está vazio!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false
    } else if (senha === "") {
        Swal.fire({
            title: 'Erro!',
            text: 'O campo da senha está vazio!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false
    } else {
        return true 
    }
}

window.validarLogin = async function () {

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value

    if (!validarEmailESenha(email, senha)) {
        return 
    }

    const login = {
        "email": email,
        "senha": senha
    }

    try {
        const authUser = await postLoginInformacoes(login)
         
        if (authUser.status === true) {

            const jwt = authUser.response.usuario.jwt
        
            localStorage.setItem("jwt", jwt)

            Swal.fire({
                title: 'Sucesso!',
                text: 'Logado com sucesso',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                window.location.href = "painel.html"
            })
        
        } else if (authUser.status === false) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível fazer login com seu e-mail e senha.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
        }

    } catch (error) {
        Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível fazer login com seu e-mail e senha.',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
    }
}