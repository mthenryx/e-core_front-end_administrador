'use strict'

//Todos os imports

import {postLoginInformacoes} from "./usuarios.js"
import {} from "./alert/alerts.js"

//Tela de Login

function validarEmailESenha(email, senha){
    if(email == ""){
        
    }else if(senha == ""){
        
    }else{
        return true
    }
}

async function validarLogin(){
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").valu

    validarEmailESenha(email,senha)

    const login = {
                    "email": email,
                    "senha": senha
                }
    
    const authUser = await postLoginInformacoes(login)

    if(authUser){
        window.location.href = "painel.html"
    }else{
        
    } 
} 


