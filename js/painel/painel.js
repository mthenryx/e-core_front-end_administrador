'use strict'

//Tela lista de bebidas

function criarTelaListaDeBebidas(){
    const container = document.getElementById("container")

    const h2 = document.createElement("h2")
    h2.textContent = "Bebidas adicionadas"

    const frase = document.createElement("span")
    frase.textContent = "bebidas que já foram inseridas e podem ter seus dados atualizados"
    
    const naoAlcoolico = document.createElement("div")
    naoAlcoolico.className = "naoAlcoolico"

    const alcoolico = document.createElement("div")
    alcoolico.className = "alcoolico"

    const categoriaNaoAlcoolica = document.createElement("div")
    categoriaNaoAlcoolica.className = "categoria-nao-alcoolica"

    const categoriaAlcoolica = document.createElement("div")
    categoriaAlcoolica.className = "categoria-alcoolica"

    const tituloNaoAlcoolico = document.createElement("h3")
    tituloNaoAlcoolico.className = "titulo-nao-alcoolico"

    const tituloAlcoolico = document.createElement("h3")
    tituloAlcoolico.className = "titulo-nao-alcoolico"

    
}

//Tela de inserção de bebidas

function criarTelaInserirBebidas(){

}

//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(){

}

//Tela de inserir e atualizar novo user

function inserirCadastroUser(){

}

function criarTelaAlterarCadastroUser(){
    
}