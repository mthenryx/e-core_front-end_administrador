'use strict'

//Todos os imports

import {postBebidas, getBuscarBebidas, getListarBebidas, putBebidas, deleteBebidas} from "../rotas/bebidas.js"
import {postCaracteristica, getBuscarCaracteristica, getListarCaracteristica, putCaracteristica, deleteCaracteristica} from "../rotas/caracteristicas.js"
import {postCategoria, getBuscarCategoria, getListarCategoria, putCategoria, deleteCategoria} from "../rotas/categoria.js"
import {postFoto, getBuscarFotos, getListarFotos, putFoto, deleteFoto} from "../rotas/foto.js"
import {postMarca, getBuscarMarca, getListarMarcas, putMarca, deleteMarca} from "../rotas/marca.js"
import {postSabor, getBuscarSabor, getListarSabores, putSabor, deleteSabor} from "../rotas/sabor.js"
import {postTipoEmbalagem, getBuscarTipoEmbalagem, getListarTipoEmbalagem, putTipoEmbalagem, deleteTipoEmbalagem} from "../rotas/tipo_embalagem.js"
import {postLoginInformacoes, postUsuario, getBuscarUsuario, getListarUsuario, putUsuario, deleteUsuario} from "../rotas/usuarios.js"

//Tela lista de bebidas

async function criarTelaListaDeBebidas(){
    const pagina = document.getElementById("telaBebidas")
    pagina.className = "click"

    const container = document.getElementById("container")

    const h2 = document.createElement("h2")
    h2.textContent = "Bebidas adicionadas"

    const frase = document.createElement("span")
    frase.textContent = "bebidas que já foram inseridas e podem ter seus dados atualizados."
    frase.className = "frase"
    
    const naoAlcoolico = document.createElement("div")
    naoAlcoolico.className = "naoAlcoolico"

    const alcoolico = document.createElement("div")
    alcoolico.className = "alcoolico"

    const tituloNaoAlcoolico = document.createElement("h3")
    tituloNaoAlcoolico.className = "titulo-nao-alcoolico"
    tituloNaoAlcoolico.textContent = "Não alcoólicas"

    const tituloAlcoolico = document.createElement("h3")
    tituloAlcoolico.className = "titulo-alcoolico"
    tituloAlcoolico.textContent = "Bebidas alcoólicas"

    const categoriaNaoAlcoolica = document.createElement("div")
    categoriaNaoAlcoolica.className = "categoria-nao-alcoolica"

    const categoriaAlcoolica = document.createElement("div")
    categoriaAlcoolica.className = "categoria-alcoolica"

    const btNaturais = document.createElement("button")
    btNaturais.className = "animation"
    btNaturais.textContent = "Naturais"

    const btIndustrializadas = document.createElement("button")
    btIndustrializadas.className = "animation"
    btIndustrializadas.textContent = "Industrializadas"

    const btQuentes = document.createElement("button")
    btQuentes.className = "animation"
    btQuentes.textContent = "Quentes"

    const btFuncionais = document.createElement("button")
    btFuncionais.className = "animation"
    btFuncionais.textContent = "Funcionais"

    const btTodosNaoAlcoolica = document.createElement("button")
    btTodosNaoAlcoolica.className = "animation"
    btTodosNaoAlcoolica.textContent = "Todos"

    const btVinho = document.createElement("button")
    btVinho.className = "animation"
    btVinho.textContent = "Vinho"

    const btCerveja = document.createElement("button")
    btCerveja.className = "animation"
    btCerveja.textContent = "Cerveja"

    const btSidra = document.createElement("button")
    btSidra.className = "animation"
    btSidra.textContent = "Sidra"

    const btHidromel = document.createElement("button")
    btHidromel.className = "animation"
    btHidromel.textContent = "Hidromel"

    const btTodos = document.createElement("button")
    btTodos.className = "animation"
    btTodos.textContent = "Todos"

    const carrosselNaoAlcoolica = document.createElement("div")
    carrosselNaoAlcoolica.className = "carrocel"

    const carrosselAlcoolica = document.createElement("div")
    carrosselAlcoolica.className = "carrocel"

    categoriaAlcoolica.append(btNaturais, btIndustrializadas, btQuentes, btFuncionais, btTodosNaoAlcoolica)
    categoriaNaoAlcoolica.append(btVinho, btCerveja, btSidra, btHidromel, btTodos)
    alcoolico.append(tituloAlcoolico, categoriaAlcoolica, carrosselAlcoolica)
    naoAlcoolico.append(tituloNaoAlcoolico, categoriaNaoAlcoolica, carrosselNaoAlcoolica)
    container.append(h2, frase, naoAlcoolico, alcoolico)

    criarCards()
}

async function criarCards(){

}

//Tela de inserção de bebidas

async function criarTelaInserirBebidas(){
    const container = document.getElementById("container")

    const pagina = document.getElementById("telaAdd")
    pagina.className = "click"

    const h2 = document.createElement("h2")
    h2.textContent = "Adicionar nova bebida"

    const frase = document.createElement("span")
    frase.textContent = "Preencha as informações abaixo para cadastrar um novo item no cardápio."
    frase.className = "frase"

    const sctInformacaoBasica = document.createElement("section")

    const sctImagemProduto = document.createElement("section")

    const sctCaracteristicas = document.createElement("section")

    const sctTipo = document.createElement("section")

    const sctDisponibilidade = document.createElement("section")

    const bctDescatar = document.createElement("button")
    bctDescatar.textContent = "🗑 Descartar"

    const bctSalvar = document.createElement("button")
    bctSalvar.textContent = "✓ Salvar"

    const pagina = document.getElementById("telaBebidas")
    pagina.className = "click"
}

criarTelaInserirBebidas()

//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(){

}

//Tela de inserir e atualizar novo user

function inserirCadastroUser(){

}

function criarTelaAlterarCadastroUser(){
    
}