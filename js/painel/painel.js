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
    container.innerHTML = ""

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
    btNaturais.addEventListener("click", () => {
        await filtraCategoria()
    })
    
    const btIndustrializadas = document.createElement("button")
    btIndustrializadas.className = "animation"
    btIndustrializadas.textContent = "Industrializadas"
    btIndustrializadas.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btQuentes = document.createElement("button")
    btQuentes.className = "animation"
    btQuentes.textContent = "Quentes"
    btQuentes.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btFuncionais = document.createElement("button")
    btFuncionais.className = "animation"
    btFuncionais.textContent = "Funcionais"
    btFuncionais.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btTodosNaoAlcoolica = document.createElement("button")
    btTodosNaoAlcoolica.className = "animation"
    btTodosNaoAlcoolica.textContent = "Todos"
    btTodosNaoAlcoolica.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btVinho = document.createElement("button")
    btVinho.className = "animation"
    btVinho.textContent = "Vinho"
    btVinho.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btCerveja = document.createElement("button")
    btCerveja.className = "animation"
    btCerveja.textContent = "Cerveja"
    btCerveja.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btSidra = document.createElement("button")
    btSidra.className = "animation"
    btSidra.textContent = "Sidra"
    btSidra.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btHidromel = document.createElement("button")
    btHidromel.className = "animation"
    btHidromel.textContent = "Hidromel"
    btHidromel.addEventListener("click", () => {
        await filtraCategoria()
    })

    const btTodos = document.createElement("button")
    btTodos.className = "animation"
    btTodos.textContent = "Todos"
    btTodos.addEventListener("click", () => {
        await filtraCategoria()
    })

    const carrosselNaoAlcoolica = document.createElement("div")
    carrosselNaoAlcoolica.className = "carrossel"
    carrosselNaoAlcoolica.id = "nao-alcoolica"

    const carrosselAlcoolica = document.createElement("div")
    carrosselAlcoolica.className = "carrossel"
    carrosselNaoAlcoolica.id = "alcoolica"

    categoriaAlcoolica.append(btNaturais, btIndustrializadas, btQuentes, btFuncionais, btTodosNaoAlcoolica)
    categoriaNaoAlcoolica.append(btVinho, btCerveja, btSidra, btHidromel, btTodos)
    alcoolico.append(tituloAlcoolico, categoriaAlcoolica, carrosselAlcoolica)
    naoAlcoolico.append(tituloNaoAlcoolico, categoriaNaoAlcoolica, carrosselNaoAlcoolica)
    container.append(h2, frase, naoAlcoolico, alcoolico)

    await criarCards()
}

function filtraCategoria(categoria){

}

async function criarCards(){
    const naoAlcoolico = document.getElementById("nao-alcoolica")
    const alcoolico = document.getElementById("alcoolica")

    try {
        const lista = await getListarBebidas()

        if(!lista.status){
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível exibir as bebidas existentes!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
            return

        } else {

            for(let informacao of lista){

                for(let foto_embalagem of informacao.foto_embalagem[0]){

                    const card = document.createElement("div")
                    card.className = "card"

                    const boxDrinck = document.createElement("div")
                    boxDrinck.className = "box-drink"

                    const info = document.createElement("div")
                    info.className = "info"

                    const foto = document.createElement("img")
                    foto.src = foto_embalagem.foto

                    const litragem = document.createElement("span")
                    litragem.textContent = informacao.litragem
                    litragem.className = "litragem"

                    const marca = document.createElement("h6")
                    marca.textContent = informacao.marca[0].nome
                    marca.className = "marca"

                    const nome = document.createElement("h5")
                    nome.textContent = informacao.nome
                    nome.className = "nome-bebida"

                    const descricao = document.createElement("p")
                    descricao.textContent = informacao.descricao
                    descricao.className = "descricao"

                    const valor = document.createElement("span")
                    valor.textContent = foto_embalagem.valor     
                    valor.className = "valor"

                    const botoes = document.createElement("div")
                    botoes.className = "box-botoes"

                    const btAtualizar = document.createElement("button")
                    btAtualizar.className = "bt-atualizar"
                    btAtualizar.addEventListener("click", () => {
                        criarTelaAtualizarBebidas(informacao, foto_embalagem)
                    })

                    const btDeletar = document.createElement("button")
                    btDeletar.className = "bt-deletar"
                    btDeletar.addEventListener("click", () => {
                        deletarBebida(informacao.id)
                    })

                    const imgLapis = document.createElement("img")
                    imgLapis.className = "imgLapis"
                    imgLapis.src = "./img/Pencil.png"
                    
                    const imgLixeira = document.createElement("img")
                    imgLapis.className = "imgLixeira"
                    imgLixeira.src = "./img/Lock.png"

                    btDeletar.appendChild(imgLapis)
                    btAtualizar.appendChild(imgLixeira)
                    botoes.append(btAtualizar, btDeletar)
                    info.append(marca, nome, descricao, valor, botoes)
                    boxDrinck.append(foto, litragem)
                    card.appendChild(boxDrinck, info)
                }
            }
        }
    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível exibir as bebidas existentes!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    }
}

async function deletarBebida(id){
    try {
        const deletando = await deleteBebidas(id)

        if(!deletando.status){
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível deletar a bebida!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }else{
            Swal.fire({
                title: 'Sucess!',
                text: 'Bebida deletada com sucesso!',
                icon: 'sucess',
                confirmButtonText: 'Ok'
            })
        }

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível deletar a bebida!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

criarTelaListaDeBebidas()

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

}


//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(){

}

//Tela de inserir e atualizar novo user

function inserirCadastroUser(){

}

function criarTelaAlterarCadastroUser(){
    
}