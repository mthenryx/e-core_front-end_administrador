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

const jwt = localStorage.getItem("jwt")
let bebidasCadastradas = []
let swiperNaoAlcoolico = null
let swiperAlcoolico = null

const filtrosNaoAlcoolicos = ["Naturais", "Industrializadas", "Quentes", "Funcionais"]
const filtrosAlcoolicos = ["Vinho", "Cerveja", "Sidra", "Hidromel"]

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
    
    const naoAlcoolico = document.createElement("section")
    naoAlcoolico.id = "naoAlcoolico"
    naoAlcoolico.className = "naoAlcoolico secao-bebidas"

    const alcoolico = document.createElement("section")
    alcoolico.id = "alcoolico"
    alcoolico.className = "alcoolico secao-bebidas"

    const tituloNaoAlcoolico = document.createElement("h3")
    tituloNaoAlcoolico.className = "titulo-nao-alcoolico"
    tituloNaoAlcoolico.textContent = "Não alcoólicas"

    const tituloAlcoolico = document.createElement("h3")
    tituloAlcoolico.className = "titulo-alcoolico"
    tituloAlcoolico.textContent = "Bebidas alcoólicas"

    const categoriaNaoAlcoolica = document.createElement("div")
    categoriaNaoAlcoolica.className = "categoria-nao-alcoolica filtros-bebidas"

    const categoriaAlcoolica = document.createElement("div")
    categoriaAlcoolica.className = "categoria-alcoolica filtros-bebidas"

    const botoesNaoAlcoolicos = criarBotoesFiltro(filtrosNaoAlcoolicos, "naoAlcoolico")
    const btTodosNaoAlcoolica = criarBotaoFiltro("Todos", "naoAlcoolico", true)
    btTodosNaoAlcoolica.classList.add("selecao")

    const botoesAlcoolicos = criarBotoesFiltro(filtrosAlcoolicos, "alcoolico")
    const btTodos = criarBotaoFiltro("Todos", "alcoolico", true)
    btTodos.classList.add("selecao")

    const wrapperNaoAlcoolico = document.createElement("div")
    wrapperNaoAlcoolico.className = "wrapperNaoAlcoolico swiper carrossel-bebidas"
    
    const wrapperAlcoolico = document.createElement("div")
    wrapperAlcoolico.className = "wrapperAlcoolico swiper carrossel-bebidas"
    
    const cardListAlcoolico = document.createElement("ul")
    cardListAlcoolico.id = "card-list-alcoolico"
    cardListAlcoolico.className = "card-list swiper-wrapper"

    const cardListNaoAlcoolico = document.createElement("ul")
    cardListNaoAlcoolico.id = "card-list-nao-alcoolico"
    cardListNaoAlcoolico.className = "card-list swiper-wrapper"

    const swiperPagination = document.createElement("div")
    swiperPagination.className = "swiper-pagination swiper-pagination-nao-alcoolico"

    const buttonPrev = document.createElement("div")
    buttonPrev.className = "swiper-button-prev swiper-button-prev-nao-alcoolico"

    const buttonNext = document.createElement("div")
    buttonNext.className = "swiper-button-next swiper-button-next-nao-alcoolico"

    const swiperPaginationAlcoolico = document.createElement("div")
    swiperPaginationAlcoolico.className = "swiper-pagination swiper-pagination-alcoolico"

    const buttonPrevAlcoolico = document.createElement("div")
    buttonPrevAlcoolico.className = "swiper-button-prev swiper-button-prev-alcoolico"

    const buttonNextAlcoolico = document.createElement("div")
    buttonNextAlcoolico.className = "swiper-button-next swiper-button-next-alcoolico"

    wrapperNaoAlcoolico.append(cardListNaoAlcoolico, swiperPagination, buttonPrev, buttonNext)
    wrapperAlcoolico.append(cardListAlcoolico, swiperPaginationAlcoolico, buttonPrevAlcoolico, buttonNextAlcoolico)
    categoriaAlcoolica.append(...botoesAlcoolicos, btTodos)
    categoriaNaoAlcoolica.append(...botoesNaoAlcoolicos, btTodosNaoAlcoolica)
    alcoolico.append(tituloAlcoolico, categoriaAlcoolica, wrapperAlcoolico)
    naoAlcoolico.append(tituloNaoAlcoolico, categoriaNaoAlcoolica, wrapperNaoAlcoolico)
    container.append(h2, frase, naoAlcoolico, alcoolico)

    await criarCards()
}

function criarBotoesFiltro(categorias, grupo){
    return categorias.map((categoria) => criarBotaoFiltro(categoria, grupo))
}

function criarBotaoFiltro(categoria, grupo, mostrarTodos = false){
    const botao = document.createElement("button")
    botao.className = "animation"
    botao.textContent = categoria
    botao.type = "button"
    botao.dataset.grupo = grupo
    botao.dataset.categoria = mostrarTodos ? "Todos" : categoria
    botao.addEventListener("click", () => {
        filtraCategoria(botao.dataset.categoria, grupo)
    })

    return botao
}

function filtraCategoria(categoria, grupo){
    const seletor = grupo == "alcoolico" ? ".categoria-alcoolica" : ".categoria-nao-alcoolica"
    const botoes = document.querySelectorAll(`${seletor} .animation`)

    botoes.forEach((botao) => {
        botao.classList.toggle("selecao", botao.dataset.categoria == categoria)
    })

    renderizarCards(grupo, categoria)
}

async function criarCards(){
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
        }

        bebidasCadastradas = lista.response.bebida || []
        renderizarCards("naoAlcoolico", "Todos")
        renderizarCards("alcoolico", "Todos")
    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível exibir as bebidas existentes!',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
    }
}

function renderizarCards(grupo, categoria = "Todos"){
    const lista = document.getElementById(grupo == "alcoolico" ? "card-list-alcoolico" : "card-list-nao-alcoolico")
    const bebidas = filtrarBebidas(grupo, categoria)
    const swiperAtual = grupo == "alcoolico" ? swiperAlcoolico : swiperNaoAlcoolico

    if(swiperAtual){
        swiperAtual.destroy(true, true)
    }

    lista.innerHTML = ""

    if(!bebidas.length){
        const itemLista = document.createElement("li")
        itemLista.className = "swiper-slide"

        const vazio = document.createElement("div")
        vazio.className = "card-vazio"
        vazio.textContent = "Nenhuma bebida encontrada."

        itemLista.append(vazio)
        lista.append(itemLista)
    }else{
        bebidas.forEach((bebida) => {
            const fotos = bebida.foto_embalagem?.length ? bebida.foto_embalagem : [{}]

            fotos.forEach((fotoEmbalagem) => {
                lista.append(criarCardBebida(bebida, fotoEmbalagem))
            })
        })
    }

    const swiper = criarSwiper(grupo)

    if(grupo == "alcoolico"){
        swiperAlcoolico = swiper
    }else{
        swiperNaoAlcoolico = swiper
    }
}

function filtrarBebidas(grupo, categoria){
    return bebidasCadastradas.filter((bebida) => {
        const bebidaAlcoolica = temCaracteristica(bebida, "Alcoolica")
        const pertenceAoGrupo = grupo == "alcoolico" ? bebidaAlcoolica : !bebidaAlcoolica
        const passaCategoria = categoria == "Todos" || temCategoria(bebida, categoria)

        return pertenceAoGrupo && passaCategoria
    })
}

function temCaracteristica(bebida, nome){
    return bebida.caracteristica?.some((caracteristica) => normalizarTexto(caracteristica.nome) == normalizarTexto(nome))
}

function temCategoria(bebida, nomeCategoria){
    return bebida.categoria?.some((categoria) => normalizarTexto(categoria.nome_categoria) == normalizarTexto(nomeCategoria))
}

function normalizarTexto(texto = ""){
    return texto.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
}

function criarCardBebida(bebida, fotoEmbalagem){
    const itemLista = document.createElement("li")
    itemLista.className = "swiper-slide"

    const card = document.createElement("article")
    card.className = "card-bebida"

    const boxDrink = document.createElement("div")
    boxDrink.className = "box-drink"

    const foto = document.createElement("img")
    foto.src = fotoEmbalagem.foto || "./img/logo.png"
    foto.alt = bebida.nome

    const litragem = document.createElement("span")
    litragem.textContent = bebida.litragem

    const info = document.createElement("div")
    info.className = "info"

    const marca = document.createElement("h6")
    marca.textContent = bebida.marca?.[0]?.nome_marca || "Sem marca"

    const nome = document.createElement("h5")
    nome.textContent = bebida.nome

    const descricao = document.createElement("p")
    descricao.textContent = bebida.descricao

    const valor = document.createElement("span")
    valor.textContent = formatarValor(fotoEmbalagem.valor)
    valor.className = "valor"

    const botoes = document.createElement("div")
    botoes.className = "box-botoes"

    const btAtualizar = document.createElement("button")
    btAtualizar.className = "bt-atualizar"
    btAtualizar.type = "button"
    btAtualizar.addEventListener("click", () => {
        criarTelaAtualizarBebidas(bebida, fotoEmbalagem)
    })

    const btDeletar = document.createElement("button")
    btDeletar.className = "bt-deletar"
    btDeletar.type = "button"
    btDeletar.addEventListener("click", () => {
        deletarBebida(bebida.id)
    })

    const imgLapis = document.createElement("img")
    imgLapis.className = "imgLapis"
    imgLapis.src = "./img/Pencil.png"
    imgLapis.alt = "Atualizar"
    
    const imgLixeira = document.createElement("img")
    imgLixeira.className = "imgLixeira"
    imgLixeira.src = "./img/Remove.png"
    imgLixeira.alt = "Deletar"

    btAtualizar.appendChild(imgLapis)
    btDeletar.appendChild(imgLixeira)
    botoes.append(btAtualizar, btDeletar)
    info.append(marca, nome, descricao, valor, botoes)
    boxDrink.append(foto, litragem)
    card.append(boxDrink, info)
    itemLista.append(card)

    return itemLista
}

function formatarValor(valor){
    const numero = Number(valor || 0)

    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

function criarSwiper(grupo){
    const alcoolico = grupo == "alcoolico"

    return new Swiper(alcoolico ? ".wrapperAlcoolico" : ".wrapperNaoAlcoolico", {
        loop: false,
        spaceBetween: 36,
        watchOverflow: true,
        pagination: {
            el: alcoolico ? ".wrapperAlcoolico .swiper-pagination-alcoolico" : ".wrapperNaoAlcoolico .swiper-pagination-nao-alcoolico",
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: alcoolico ? ".wrapperAlcoolico .swiper-button-next-alcoolico" : ".wrapperNaoAlcoolico .swiper-button-next-nao-alcoolico",
            prevEl: alcoolico ? ".wrapperAlcoolico .swiper-button-prev-alcoolico" : ".wrapperNaoAlcoolico .swiper-button-prev-nao-alcoolico",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 18
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 28
            },
            1100: {
                slidesPerView: 3,
                spaceBetween: 36
            }
        }
    })
}

async function deletarBebida(id){
    try {

        const deletando = await deleteBebidas(id, jwt)

        if(!deletando){
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível deletar a bebida!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }else{
            Swal.fire({
                title: 'Sucesso!',
                text: 'Bebida deletada com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                location.reload()
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
    
}

//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(){

}

//Tela de inserir e atualizar novo user

function inserirCadastroUser(){

}

function criarTelaAlterarCadastroUser(){
    
}