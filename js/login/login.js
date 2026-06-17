'use strict'

// Todos os imports
import { postLoginInformacoes } from "../rotas/usuarios.js"

// Tela de Login

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
            Swal.fire({
                title: 'Sucesso!',
                text: 'Logado com sucesso',
                icon: 'success', 
                confirmButtonText: 'Ok'
            }).then(() => {
                window.location.href = "painel.html"
            })
        } else if (authUser.status === false) {
            exibirMensagemErro();
        }

    } catch (error) {
        exibirMensagemErro();
    }
}

function exibirMensagemErro() {
    Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível fazer login com seu e-mail e senha.',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}