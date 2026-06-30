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
import {uploadParaCloudinary} from "../rotas/cloudnary.js"

//Tela lista de bebidas

const jwt = localStorage.getItem("jwt")
let bebidasCadastradas = []
let swiperNaoAlcoolico = null
let swiperAlcoolico = null

const filtrosNaoAlcoolicos = ["Naturais", "Industrializadas", "Quentes", "Funcionais"]
const filtrosAlcoolicos = ["Vinho", "Cerveja", "Sidra", "Hidromel"]

const telaBebidas = document.getElementById("telaBebidas")
const telaAdd = document.getElementById("telaAdd")
const telaAlterar = document.getElementById("telaAlterar")
const container = document.getElementById("container")

telaBebidas.addEventListener("click", () => {
    criarTelaListaDeBebidas();
})

telaAdd.addEventListener("click", () => {
    criarTelaInserirBebidas();
})

telaAlterar.addEventListener("click", () => {
    criarTelaAlterarCadastroUser();
})

async function criarTelaListaDeBebidas(){
    telaBebidas.className = "click"
    telaAlterar.classList.replace("click", "not-click")
    telaAdd.classList.replace("click", "not-click")

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
    telaAdd.className = "click"
    telaBebidas.classList.replace("click", "not-click")
    telaAlterar.classList.replace("click", "not-click")

    container.innerHTML = ""

    const bebidaCadastroBox = document.createElement("section");
    bebidaCadastroBox.className = "bebidaCadastroBox"

    const bebidaCadastroFormulario = document.createElement('div')
 
    const titulo = document.createElement('h2')
    titulo.className = 'bebidaCadastroTitulo'
    titulo.textContent = 'Adicionar nova bebida'
    bebidaCadastroFormulario.appendChild(titulo)
    
    const subtitulo = document.createElement('p')
    subtitulo.className = 'bebidaCadastroSubtitulo'
    subtitulo.textContent = 'Preencha as informações abaixo para cadastrar um novo item no cardápio.'
    bebidaCadastroFormulario.appendChild(subtitulo)
    
    const cardInfo = document.createElement('div')
    cardInfo.className = 'bebidaCadastroCard'
    cardInfo.setAttribute('data-bebida-card', '')
    
    const cardInfoTitulo = document.createElement('div')
    cardInfoTitulo.className = 'bebidaCadastroCardTitulo'
    cardInfoTitulo.textContent = 'ℹ️ Informações básicas'
    cardInfo.appendChild(cardInfoTitulo)
    
    const cardInfoLinha = document.createElement('div')
    cardInfoLinha.className = 'bebidaCadastroLinha'
    cardInfo.appendChild(cardInfoLinha)
    
    const labelNome = document.createElement('label')
    labelNome.className = 'bebidaCadastroLabel'
    labelNome.textContent = 'Nome da bebida *'
    cardInfo.appendChild(labelNome)
    
    const inputNome = document.createElement('input')
    inputNome.className = 'bebidaCadastroInput'
    inputNome.type = 'text'
    cardInfo.appendChild(inputNome)
    
    const labelDescricao = document.createElement('label')
    labelDescricao.className = 'bebidaCadastroLabel'
    labelDescricao.textContent = 'Descrição *'
    cardInfo.appendChild(labelDescricao)
    
    const textareaDescricao = document.createElement('textarea')
    textareaDescricao.className = 'bebidaCadastroTextarea'
    cardInfo.appendChild(textareaDescricao)
    
    const labelCategoria = document.createElement('label')
    labelCategoria.className = 'bebidaCadastroLabel'
    labelCategoria.textContent = 'Categoria *'
    cardInfo.appendChild(labelCategoria)
    
    const selectCategoria = document.createElement('select')
    selectCategoria.className = 'bebidaCadastroSelect'

    await carregarCategoriasNoSelect(selectCategoria)

    cardInfo.appendChild(selectCategoria)
    
    const btnDescartarInfo = document.createElement('button')
    btnDescartarInfo.type = 'button'
    btnDescartarInfo.className = 'bebidaCadastroDescartar'
    btnDescartarInfo.setAttribute('data-descartar-card', '')
    btnDescartarInfo.textContent = '🗑️ Descartar'
    cardInfo.appendChild(btnDescartarInfo)
    
    bebidaCadastroFormulario.appendChild(cardInfo)
    
    const cardImagem = document.createElement('div')
    cardImagem.className = 'bebidaCadastroCard'
    cardImagem.setAttribute('data-bebida-card', '')
    
    const cardImagemTitulo = document.createElement('div')
    cardImagemTitulo.className = 'bebidaCadastroCardTitulo'
    cardImagemTitulo.textContent = '🖼️ Imagem do produto'
    cardImagem.appendChild(cardImagemTitulo)
    
    const cardImagemLinha = document.createElement('div')
    cardImagemLinha.className = 'bebidaCadastroLinha'
    cardImagem.appendChild(cardImagemLinha)
    
    const inputFile = document.createElement('input')
    inputFile.className = 'bebidaCadastroFile'
    inputFile.type = 'file'
    inputFile.accept = 'image/png,image/jpeg,image/webp'
    cardImagem.appendChild(inputFile)
    
    const btnUpload = document.createElement('button')
    btnUpload.type = 'button'
    btnUpload.className = 'bebidaCadastroUpload'
    btnUpload.setAttribute('aria-label', 'Selecionar imagem')
    
    const spanUploadIcon = document.createElement('span')
    spanUploadIcon.className = 'bebidaCadastroUploadIcon'
    spanUploadIcon.textContent = '⬆'
    btnUpload.appendChild(spanUploadIcon)

    const spanUploadImageIconFrase = document.createElement('span')
    spanUploadImageIconFrase.className = 'bebidaCadastroUploadFrase'
    spanUploadImageIconFrase.textContent = 'Arraste uma foto ou clique para fazer upload'
    btnUpload.appendChild(spanUploadImageIconFrase)
    
    const spanUploadImageIcon = document.createElement('span')
    spanUploadImageIcon.className = 'bebidaCadastroUploadImageIcon'
    spanUploadImageIcon.textContent = 'PNG, JPG ou WEBP · máx. 5 MB · recomendado 800×800px'
    btnUpload.appendChild(spanUploadImageIcon)
    
    cardImagem.appendChild(btnUpload)
    
    bebidaCadastroFormulario.appendChild(cardImagem)
    
    const cardPreco = document.createElement('div')
    cardPreco.className = 'bebidaCadastroCard'
    cardPreco.setAttribute('data-bebida-card', '')
    
    const cardPrecoTitulo = document.createElement('div')
    cardPrecoTitulo.className = 'bebidaCadastroCardTitulo'
    cardPrecoTitulo.textContent = '$ Preço, litragem e tipo embalagem'
    cardPreco.appendChild(cardPrecoTitulo)
    
    const cardPrecoLinha = document.createElement('div')
    cardPrecoLinha.className = 'bebidaCadastroLinha'
    cardPreco.appendChild(cardPrecoLinha)
    
    const gridTres = document.createElement('div')
    gridTres.className = 'bebidaCadastroGridTres'
    
    const colLitragem = document.createElement('div')
    const labelLitragem = document.createElement('label')
    labelLitragem.className = 'bebidaCadastroLabel'
    labelLitragem.textContent = 'Litragem'
    colLitragem.appendChild(labelLitragem)
    
    const selectLitragem = document.createElement('select')
    selectLitragem.className = 'bebidaCadastroSelect'

    const opcoes = [
        "Selecione uma litragem",
        "200 ml",
        "220 ml",
        "250 ml",
        "269 ml",
        "275 ml",
        "300 ml",
        "310 ml",
        "330 ml",
        "350 ml",
        "355 ml",
        "450 ml",
        "473 ml",
        "500 ml",
        "600 ml",
        "700 ml",
        "750 ml",
        "1 L",
        "1,25 L",
        "1,5 L",
        "1,75 L",
        "2 L",
        "2,25 L",
        "2,5 L",
        "3 L",
        "5 L"
    ]

    opcoes.forEach((texto, index) => {
        const option = document.createElement("option")
        option.value = texto
        option.textContent = texto

        if (index === 0) {
            option.selected = true
            option.disabled = true
        }

        selectLitragem.appendChild(option)
    });

    colLitragem.appendChild(selectLitragem)
    
    gridTres.appendChild(colLitragem)
    
    const colPreco = document.createElement('div')
    const labelPreco = document.createElement('label')
    labelPreco.className = 'bebidaCadastroLabel'
    labelPreco.textContent = 'Preço *'
    colPreco.appendChild(labelPreco)
    
    const precoBox = document.createElement('div')
    precoBox.className = 'bebidaCadastroPrecoBox'
    
    const spanPrecoPrefixo = document.createElement('span')
    spanPrecoPrefixo.textContent = 'R$'
    precoBox.appendChild(spanPrecoPrefixo)
    
    const inputPreco = document.createElement('input')
    inputPreco.className = 'bebidaCadastroPrecoInput'
    inputPreco.type = 'text'
    precoBox.appendChild(inputPreco)
    
    colPreco.appendChild(precoBox)
    gridTres.appendChild(colPreco)
    
    const colEmbalagem = document.createElement('div')
    const labelEmbalagem = document.createElement('label')
    labelEmbalagem.className = 'bebidaCadastroLabel'
    labelEmbalagem.textContent = 'Tipo embalagem'
    colEmbalagem.appendChild(labelEmbalagem)
    
    const selectEmbalagem = document.createElement('select')
    selectEmbalagem.className = 'bebidaCadastroSelect'

    await carregarTiposEmbalagemNoSelect(selectEmbalagem)

    colEmbalagem.appendChild(selectEmbalagem)
    
    gridTres.appendChild(colEmbalagem)
    
    cardPreco.appendChild(gridTres)
    
    const btnDescartarPreco = document.createElement('button')
    btnDescartarPreco.type = 'button'
    btnDescartarPreco.className = 'bebidaCadastroDescartar'
    btnDescartarPreco.setAttribute('data-descartar-card', '')
    btnDescartarPreco.textContent = '🗑️ Descartar'
    cardPreco.appendChild(btnDescartarPreco)
    
    bebidaCadastroFormulario.appendChild(cardPreco)
    
    const cardGas = document.createElement('div')
    cardGas.className = 'bebidaCadastroCard'
    cardGas.setAttribute('data-bebida-card', '')
    
    const cardGasTitulo = document.createElement('div')
    cardGasTitulo.className = 'bebidaCadastroCardTitulo'
    cardGasTitulo.textContent = '🍾 Gaseificação e Alcoólico'
    cardGas.appendChild(cardGasTitulo)
    
    const cardGasLinha = document.createElement('div')
    cardGasLinha.className = 'bebidaCadastroLinha'
    cardGas.appendChild(cardGasLinha)
    
    const gridDois = document.createElement('div')
    gridDois.className = 'bebidaCadastroGridDois'
    
    const colGaseificada = document.createElement('div')
    const labelGaseificada = document.createElement('label')
    labelGaseificada.className = 'bebidaCadastroLabel'
    labelGaseificada.textContent = 'Gaseificada'
    colGaseificada.appendChild(labelGaseificada)
    
    const selectGaseificada = document.createElement('select')
    selectGaseificada.className = 'bebidaCadastroSelect'

    colGaseificada.appendChild(selectGaseificada)
    
    gridDois.appendChild(colGaseificada)
    
    const colAlcoolico = document.createElement('div')
    const labelAlcoolico = document.createElement('label')
    labelAlcoolico.className = 'bebidaCadastroLabel'
    labelAlcoolico.textContent = 'Alcoólico'
    colAlcoolico.appendChild(labelAlcoolico)
    
    const selectAlcoolico = document.createElement('select')
    selectAlcoolico.className = 'bebidaCadastroSelect'

    await carregarCaracteristicasNoSelect(selectGaseificada, selectAlcoolico)

    colAlcoolico.appendChild(selectAlcoolico)
    
    gridDois.appendChild(colAlcoolico)
    
    cardGas.appendChild(gridDois)
    
    const btnDescartarGas = document.createElement('button')
    btnDescartarGas.type = 'button'
    btnDescartarGas.className = 'bebidaCadastroDescartar'
    btnDescartarGas.setAttribute('data-descartar-card', '')
    btnDescartarGas.textContent = '🗑️ Descartar'
    cardGas.appendChild(btnDescartarGas)
    
    bebidaCadastroFormulario.appendChild(cardGas)
    
    const cardMarcaSabor = document.createElement('div')
    cardMarcaSabor.className = 'bebidaCadastroCard'
    cardMarcaSabor.setAttribute('data-bebida-card', '')

    const cardMarcaSaborTitulo = document.createElement('div')
    cardMarcaSaborTitulo.className = 'bebidaCadastroCardTitulo'
    cardMarcaSaborTitulo.textContent = '🏷️ Marca e sabor'
    cardMarcaSabor.appendChild(cardMarcaSaborTitulo)

    const cardMarcaSaborLinha = document.createElement('div')
    cardMarcaSaborLinha.className = 'bebidaCadastroLinha'
    cardMarcaSabor.appendChild(cardMarcaSaborLinha)

    const gridMarcaSabor = document.createElement('div')
    gridMarcaSabor.className = 'bebidaCadastroGridDois'

    const colMarca = document.createElement('div')

    const labelMarca = document.createElement('label')
    labelMarca.className = 'bebidaCadastroLabel'
    labelMarca.textContent = 'Marca'
    colMarca.appendChild(labelMarca)

    const selectMarca = document.createElement('select')
    selectMarca.className = 'bebidaCadastroSelect'

    colMarca.appendChild(selectMarca)
    gridMarcaSabor.appendChild(colMarca)

    const colSabor = document.createElement('div')

    const labelSabor = document.createElement('label')
    labelSabor.className = 'bebidaCadastroLabel'
    labelSabor.textContent = 'Sabor'
    colSabor.appendChild(labelSabor)

    const selectSabor = document.createElement('select')
    selectSabor.className = 'bebidaCadastroSelect'

    colSabor.appendChild(selectSabor)
    gridMarcaSabor.appendChild(colSabor)

    cardMarcaSabor.appendChild(gridMarcaSabor)

    const btnDescartarMarcaSabor = document.createElement('button')
    btnDescartarMarcaSabor.type = 'button'
    btnDescartarMarcaSabor.className = 'bebidaCadastroDescartar'
    btnDescartarMarcaSabor.setAttribute('data-descartar-card', '')
    btnDescartarMarcaSabor.textContent = '🗑️ Descartar'
    cardMarcaSabor.appendChild(btnDescartarMarcaSabor)

    bebidaCadastroFormulario.appendChild(cardMarcaSabor)

    await carregarMarcasNoSelect(selectMarca)
    await carregarSaborNoSelect(selectSabor)

    const acoes = document.createElement('div')
    acoes.className = 'bebidaCadastroAcoes'
    
    const btnDescartarTudo = document.createElement('button')
    btnDescartarTudo.type = 'button'
    btnDescartarTudo.className = 'bebidaCadastroDescartarTudo'
    btnDescartarTudo.textContent = '🗑️ Descartar'
    acoes.appendChild(btnDescartarTudo)
    
    const btnSalvar = document.createElement('button')
    btnSalvar.type = 'button'
    btnSalvar.className = 'bebidaCadastroSalvar'
    btnSalvar.textContent = '✓ Salvar'
    btnSalvar.addEventListener("click", async () => {

        if(
            !inputNome.value.trim() ||
            !textareaDescricao.value.trim() ||
            !inputPreco.value.trim() ||
            !imagemUrlCloudinary ||
            !selectLitragem.value || selectLitragem.value === "Selecione uma litragem" ||
            !selectCategoria.value || selectCategoria.value === "Selecione uma categoria" ||
            !selectMarca.value || selectMarca.value === "Selecione uma marca" ||
            !selectSabor.value || selectSabor.value === "Selecione uma sabor" ||
            !selectGaseificada.value || selectGaseificada.value === "Selecione uma opção" ||
            !selectAlcoolico.value || selectAlcoolico.value === "Selecione uma opção" ||
            !selectEmbalagem.value || selectEmbalagem.value === "Selecione uma embalagem"
        ){
            Swal.fire({
                title: 'Erro!',
                text: 'Campos não foram preenchidos corretamente!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }else{
            const bebida = {
                nome: inputNome.value,
                litragem: selectLitragem.value,
                descricao: textareaDescricao.value,
                id_categoria: Number(selectCategoria.value),
                id_marca: Number(selectMarca.value),
                id_sabor: Number(selectSabor.value),
                caracteristica: [
                    {id: Number(selectGaseificada.value)},
                    {id: Number(selectAlcoolico.value)}
                ],
                foto_embalagem: [
                    {
                        foto: imagemUrlCloudinary,
                        id_tipo_embalagem: Number(selectEmbalagem.value),
                        valor: Number(inputPreco.value.replace(",", ".")),
                    }
                ]
            }

            const newBebida = await inserirBebidaNova(bebida)

            if(newBebida.status){
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Bebida cadastrada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    bebidaCadastroBox.querySelectorAll("input, textarea, select").forEach((campo) => {
                        if (campo.type === "checkbox") {
                            campo.checked = false
                        } else {
                            campo.value = ""
                        }
                    })

                    imagemUrlCloudinary = ""
                    bebidaCadastroUpload.innerHTML = ""
                    bebidaCadastroUpload.appendChild(spanUploadIcon)
                    bebidaCadastroUpload.appendChild(spanUploadImageIcon)
                })

            }else{
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível cadastrar essa bebida!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        }
    })

    acoes.appendChild(btnSalvar)
    
    bebidaCadastroFormulario.appendChild(acoes)
    bebidaCadastroBox.appendChild(bebidaCadastroFormulario)

    const bebidaCadastroFile = bebidaCadastroBox.querySelector(".bebidaCadastroFile")
    const bebidaCadastroUpload = bebidaCadastroBox.querySelector(".bebidaCadastroUpload")

    let imagemUrlCloudinary = ""

    bebidaCadastroUpload.addEventListener("click", () => {
        bebidaCadastroFile.click()
    })

    bebidaCadastroFile.addEventListener("change", async () => {
        const arquivo = bebidaCadastroFile.files[0]

        if (!arquivo) return

        try {
            bebidaCadastroUpload.textContent = "Enviando..."

            imagemUrlCloudinary = await uploadParaCloudinary(arquivo)

            const imgPreview = document.createElement("img")
            imgPreview.className = "bebidaCadastroPreviewImg"
            imgPreview.src = imagemUrlCloudinary
            imgPreview.alt = "Imagem da bebida"
            bebidaCadastroUpload.innerHTML = ""
            bebidaCadastroUpload.appendChild(imgPreview)
        } catch (erro) {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível enviar a Imagem!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    })

    bebidaCadastroBox.querySelectorAll("[data-descartar-card]").forEach((botao) => {
    botao.addEventListener("click", () => {
        const card = botao.closest("[data-bebida-card]")

        card.querySelectorAll("input, textarea, select").forEach((campo) => {
        if (campo.type === "checkbox") {
            campo.checked = false
        } else {
            campo.value = ""
        }
        })
    })
    })

    bebidaCadastroBox.querySelector(".bebidaCadastroDescartarTudo").addEventListener("click", () => {
    bebidaCadastroBox.querySelectorAll("input, textarea, select").forEach((campo) => {
        if (campo.type === "checkbox") {
        campo.checked = false
        } else {
        campo.value = ""
        }
    })
    })

    container.appendChild(bebidaCadastroBox)
}

async function carregarCategoriasNoSelect(selectCategoria) {
    try {
        const categorias = await getListarCategoria()

        if (categorias.status && categorias.response.categoria.length > 0) {
            selectCategoria.innerHTML = ""

            const optionVazia = document.createElement("option")
            optionVazia.value = ""
            optionVazia.textContent = "Selecione uma categoria"
            optionVazia.selected = true
            optionVazia.disabled = true
            selectCategoria.appendChild(optionVazia)

            categorias.response.categoria.forEach((categoria) => {
                const option = document.createElement("option")

                option.value = categoria.id
                option.textContent = categoria.nome_categoria

                selectCategoria.appendChild(option)
            })

            return categorias
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível listar as categorias, adicione novas, talvez funcione!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível listar as categorias!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

async function carregarMarcasNoSelect(selectMarca) {
    try {
        const marcas = await getListarMarcas()

        if (marcas.status && marcas.response.marca.length > 0) {
            selectMarca.innerHTML = ""

            const optionVazia = document.createElement("option")
            optionVazia.value = ""
            optionVazia.textContent = "Selecione uma marca"
            optionVazia.selected = true
            optionVazia.disabled = true
            selectMarca.appendChild(optionVazia)

            marcas.response.marca.forEach((marca) => {
                const option = document.createElement("option")

                option.value = marca.id
                option.textContent = marca.nome_marca

                selectMarca.appendChild(option)
            })

            return marcas
        }else{
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível listar as marcas, adicione novas, talvez funcione!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível listar as marcas!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

async function carregarSaborNoSelect(selectSabor) {
    try {
        const sabores = await getListarSabores()

        if (sabores.status && sabores.response.sabor.length > 0) {
            selectSabor.innerHTML = ""

            const optionVazia = document.createElement("option")
            optionVazia.value = ""
            optionVazia.textContent = "Selecione um sabor"
            optionVazia.selected = true
            optionVazia.disabled = true
            selectSabor.appendChild(optionVazia)

            sabores.response.sabor.forEach((sabor) => {
                const option = document.createElement("option")

                option.value = sabor.id
                option.textContent = sabor.nome_sabor

                selectSabor.appendChild(option)
            })

            return sabores
        }else{
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível listar os sabores, adicione novos, talvez funcione!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível listar os sabores!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

async function carregarCaracteristicasNoSelect(selectGaseificada, selectAlcoolico) {
    try {
        const caracteristicas = await getListarCaracteristica()

        if (caracteristicas.status && caracteristicas.response.caracteristica.length > 0) {
            selectGaseificada.innerHTML = ""
            selectAlcoolico.innerHTML = ""

            const optionGasVazia = document.createElement("option")
            optionGasVazia.value = ""
            optionGasVazia.textContent = "Selecione uma opção"
            optionGasVazia.selected = true
            optionGasVazia.disabled = true
            selectGaseificada.appendChild(optionGasVazia)

            const optionAlcoolVazia = document.createElement("option")
            optionAlcoolVazia.value = ""
            optionAlcoolVazia.textContent = "Selecione uma opção"
            optionAlcoolVazia.selected = true
            optionAlcoolVazia.disabled = true
            selectAlcoolico.appendChild(optionAlcoolVazia)

            caracteristicas.response.caracteristica.forEach((caracteristica) => {
                const nomeCaracteristica = caracteristica.nome.toLowerCase()

                const option = document.createElement("option")
                option.value = caracteristica.id
                option.textContent = caracteristica.nome

                if (
                    nomeCaracteristica.includes("alcool") ||
                    nomeCaracteristica.includes("álcool")
                ) {
                    selectAlcoolico.appendChild(option)
                }

                if (
                    nomeCaracteristica.includes("gas") ||
                    nomeCaracteristica.includes("gás") ||
                    nomeCaracteristica.includes("gaseificada") ||
                    nomeCaracteristica.includes("gaseificação")
                ) {
                    selectGaseificada.appendChild(option)
                }
            })

            return caracteristicas
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível listar as características!",
                icon: "warning",
                confirmButtonText: "Ok"
            })
        }
    } catch (error) {
        Swal.fire({
            title: "Erro!",
            text: "Não foi possível listar as características!",
            icon: "error",
            confirmButtonText: "Ok"
        })
    }
}

async function carregarTiposEmbalagemNoSelect(selectEmbalagem) {
    try {
        const embalagens = await getListarTipoEmbalagem()

        if (embalagens.status && embalagens.response.tipo_embalagem.length > 0) {
            selectEmbalagem.innerHTML = ""

            const optionVazia = document.createElement("option")
            optionVazia.value = ""
            optionVazia.textContent = "Selecione uma embalagem"
            optionVazia.selected = true
            optionVazia.disabled = true
            selectEmbalagem.appendChild(optionVazia)

            embalagens.response.tipo_embalagem.forEach((embalagem) => {
                const option = document.createElement("option")

                option.value = embalagem.id
                option.textContent = embalagem.tipo_embalagem

                selectEmbalagem.appendChild(option)
            })

            return embalagens
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível listar os tipos de embalagem!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível listar os tipos de embalagem!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

async function inserirBebidaNova(bebida) {
    try {
        const bebibaNova = await postBebidas(bebida, jwt)
        return bebibaNova

    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível cadastrar à bebida!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(){

}

//Tela de inserir e atualizar novo user

function criarTelaAlterarCadastroUser(){
    telaAlterar.className = "click"
    telaBebidas.classList.replace("click", "not-click")
    telaAdd.classList.replace("click", "not-click")

    container.innerHTML = ""
}

function inserirCadastroUser(){

}

