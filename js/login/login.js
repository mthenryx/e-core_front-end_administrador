'use strict'

//Todos os imports

import { postLoginInformacoes } from "./usuarios.js"

//Tela de Login

function validarEmailESenha(email, senha) {
    if (email == "") {
        Swal.fire({
            title: 'Error!',
            text: 'O campo do e-mail está vasio!',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    } else if (senha == "") {
        Swal.fire({
            title: 'Error!',
            text: 'O campo da senha está vasio!',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    } else {
        return true
    }
}

window.validarLogin = async function () {
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").valu

    validarEmailESenha(email, senha)

    const login = {
        "email": email,
        "senha": senha
    }

    const authUser = await postLoginInformacoes(login)

    if (authUser) {
        Swal.fire({
            title: 'Sucess!',
            text: 'Logado com sucesso',
            icon: 'sucess',
            confirmButtonText: 'ok'
        })

        window.location.href = "painel.html"

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Não foi possível fazer login com seu e-mail e senha.',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }
}


