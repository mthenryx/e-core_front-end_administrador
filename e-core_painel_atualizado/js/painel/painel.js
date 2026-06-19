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

// Estado global das bebidas
let todasBebidas = []

// Helper: limpa classe "click" de todos os botões de nav
function resetNavButtons() {
    document.querySelectorAll('.funcionalidades button').forEach(btn => {
        btn.className = 'not-click'
    })
}

//Tela lista de bebidas

async function criarTelaListaDeBebidas(){
    resetNavButtons()
    const pagina = document.getElementById("telaBebidas")
    pagina.className = "click"

    const container = document.getElementById("container")
    container.innerHTML = ""

    const h2 = document.createElement("h2")
    h2.textContent = "Bebidas adicionadas"

    const frase = document.createElement("span")
    frase.textContent = "bebidas que já foram inseridas e podem ter seus dados atualizados."
    frase.className = "frase"

    // ---- Seção NÃO ALCOÓLICA ----
    const naoAlcoolico = document.createElement("div")
    naoAlcoolico.id = "naoAlcoolico"
    naoAlcoolico.className = "naoAlcoolico"

    const tituloNaoAlcoolico = document.createElement("h3")
    tituloNaoAlcoolico.className = "titulo-nao-alcoolico"
    tituloNaoAlcoolico.textContent = "Não alcoólicas"

    const categoriaNaoAlcoolica = document.createElement("div")
    categoriaNaoAlcoolica.className = "categoria-nao-alcoolica"

    const btNaturais = criarBotaoCategoria("Naturais", () => filtraCategoria("Naturais", "nao-alcoolica"))
    const btIndustrializadas = criarBotaoCategoria("Industrializadas", () => filtraCategoria("Industrializadas", "nao-alcoolica"))
    const btQuentes = criarBotaoCategoria("Quentes", () => filtraCategoria("Quentes", "nao-alcoolica"))
    const btFuncionais = criarBotaoCategoria("Funcionais", () => filtraCategoria("Funcionais", "nao-alcoolica"))
    const btTodosNaoAlcoolica = criarBotaoCategoria("Todos", () => filtraCategoria("Todos Não Alcoolicos", "nao-alcoolica"))

    categoriaNaoAlcoolica.append(btNaturais, btIndustrializadas, btQuentes, btFuncionais, btTodosNaoAlcoolica)

    // Carrossel Não Alcoólica
    const { wrapper: wrapperNao, track: trackNao } = criarCarrossel("nao-alcoolica")

    naoAlcoolico.append(tituloNaoAlcoolico, categoriaNaoAlcoolica, wrapperNao)

    // ---- Seção ALCOÓLICA ----
    const alcoolico = document.createElement("div")
    alcoolico.id = "alcoolico"
    alcoolico.className = "alcoolico"

    const tituloAlcoolico = document.createElement("h3")
    tituloAlcoolico.className = "titulo-alcoolico"
    tituloAlcoolico.textContent = "Bebidas alcoólicas"

    const categoriaAlcoolica = document.createElement("div")
    categoriaAlcoolica.className = "categoria-alcoolica"

    const btVinho = criarBotaoCategoria("Vinho", () => filtraCategoria("Vinho", "alcoolica"))
    const btCerveja = criarBotaoCategoria("Cerveja", () => filtraCategoria("Cerveja", "alcoolica"))
    const btSidra = criarBotaoCategoria("Sidra", () => filtraCategoria("Sidra", "alcoolica"))
    const btHidromel = criarBotaoCategoria("Hidromel", () => filtraCategoria("Hidromel", "alcoolica"))
    const btTodos = criarBotaoCategoria("Todos", () => filtraCategoria("Todos Alcoolicas", "alcoolica"))

    categoriaAlcoolica.append(btVinho, btCerveja, btSidra, btHidromel, btTodos)

    // Carrossel Alcoólica
    const { wrapper: wrapperAlco, track: trackAlco } = criarCarrossel("alcoolica")

    alcoolico.append(tituloAlcoolico, categoriaAlcoolica, wrapperAlco)

    container.append(h2, frase, naoAlcoolico, alcoolico)

    await criarCards()
}

// Cria um carrossel com botões e track; retorna {wrapper, track}
function criarCarrossel(id) {
    const wrapper = document.createElement("div")
    wrapper.className = "carrossel-wrapper"

    const btnLeft = document.createElement("button")
    btnLeft.className = "carrossel-btn carrossel-btn-left"
    btnLeft.innerHTML = "&#8249;"
    btnLeft.setAttribute("aria-label", "Anterior")

    const btnRight = document.createElement("button")
    btnRight.className = "carrossel-btn carrossel-btn-right"
    btnRight.innerHTML = "&#8250;"
    btnRight.setAttribute("aria-label", "Próximo")

    const overflow = document.createElement("div")
    overflow.className = "carrossel-overflow"

    const track = document.createElement("div")
    track.className = "carrossel-track"
    track.id = id

    overflow.appendChild(track)
    wrapper.append(btnLeft, overflow, btnRight)

    const cardWidth = 220

    btnRight.addEventListener("click", () => {
        const maxScroll = track.scrollWidth - overflow.offsetWidth
        const current = parseInt(track.dataset.offset || "0")
        const next = Math.min(current + cardWidth, maxScroll)
        track.dataset.offset = next
        track.style.transform = `translateX(-${next}px)`
    })

    btnLeft.addEventListener("click", () => {
        const current = parseInt(track.dataset.offset || "0")
        const next = Math.max(current - cardWidth, 0)
        track.dataset.offset = next
        track.style.transform = `translateX(-${next}px)`
    })

    track.dataset.offset = "0"
    return { wrapper, track }
}

// Helper para criar botões de filtro de categoria
function criarBotaoCategoria(texto, handler) {
    const btn = document.createElement("button")
    btn.className = "animation"
    btn.textContent = texto
    btn.addEventListener("click", () => {
        // Remove seleção de todos os irmãos
        btn.closest('.categoria-nao-alcoolica, .categoria-alcoolica')
            ?.querySelectorAll('button')
            .forEach(b => b.classList.remove('selecao'))
        btn.classList.add('selecao')
        handler()
    })
    return btn
}

async function filtraCategoria(categoria, carrosselId){
    const track = document.getElementById(carrosselId)
    if (!track) return

    // Reseta offset do carrossel
    track.dataset.offset = "0"
    track.style.transform = "translateX(0)"
    track.innerHTML = ""

    const ehTodos = categoria.startsWith("Todos")
    const ehNaoAlcoolico = carrosselId === "nao-alcoolica"

    const filtradas = todasBebidas.filter(bebida => {
        const alcolica = bebida.caracteristica.some(c =>
            c.nome?.toLowerCase().includes("alcoól") && !c.nome?.toLowerCase().includes("não") && !c.nome?.toLowerCase().includes("sem")
        )

        if (ehNaoAlcoolico && alcolica) return false
        if (!ehNaoAlcoolico && !alcolica) return false

        if (ehTodos) return true

        return bebida.categoria.some(cat =>
            cat.nome_categoria?.toLowerCase() === categoria.toLowerCase()
        )
    })

    if (filtradas.length === 0) {
        const msg = document.createElement("p")
        msg.textContent = "Nenhuma bebida encontrada nessa categoria."
        msg.className = "sem-resultado"
        track.appendChild(msg)
        return
    }

    for (let informacao of filtradas) {
        for (let foto_embalagem of informacao.foto_embalagem) {
            const card = construirCard(informacao, foto_embalagem)
            track.appendChild(card)
        }
    }
}

async function criarCards(){
    const trackNaoAlcoolica = document.getElementById("nao-alcoolica")
    const trackAlcoolica = document.getElementById("alcoolica")

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

        todasBebidas = lista.response.bebida || []

        for (let informacao of todasBebidas){
            for(let foto_embalagem of informacao.foto_embalagem){
                const card = construirCard(informacao, foto_embalagem)

                const ehAlcoolica = informacao.caracteristica.some(c =>
                    c.nome?.toLowerCase().includes("alcoól") &&
                    !c.nome?.toLowerCase().includes("não") &&
                    !c.nome?.toLowerCase().includes("sem")
                )

                if(ehAlcoolica){
                    trackAlcoolica.appendChild(card)
                } else {
                    trackNaoAlcoolica.appendChild(card)
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

function construirCard(informacao, foto_embalagem){
    const card = document.createElement("div")
    card.className = "card"

    const boxDrinck = document.createElement("div")
    boxDrinck.className = "box-drink"

    const info = document.createElement("div")
    info.className = "info"

    const foto = document.createElement("img")
    foto.src = foto_embalagem.foto
    foto.alt = informacao.nome

    const litragem = document.createElement("span")
    litragem.textContent = informacao.litragem
    litragem.className = "litragem"

    const marca = document.createElement("h6")
    marca.textContent = informacao.marca[0].nome_marca
    marca.className = "marca"

    const nome = document.createElement("h5")
    nome.textContent = informacao.nome
    nome.className = "nome-bebida"

    const descricao = document.createElement("p")
    descricao.textContent = informacao.descricao
    descricao.className = "descricao"

    const valor = document.createElement("span")
    valor.textContent = `R$ ${foto_embalagem.valor}`
    valor.className = "valor"

    const botoes = document.createElement("div")
    botoes.className = "box-botoes"

    const btAtualizar = document.createElement("button")
    btAtualizar.className = "bt-atualizar"
    btAtualizar.title = "Atualizar"
    btAtualizar.addEventListener("click", () => {
        criarTelaAtualizarBebidas(informacao, foto_embalagem)
    })

    const btDeletar = document.createElement("button")
    btDeletar.className = "bt-deletar"
    btDeletar.title = "Deletar"
    btDeletar.addEventListener("click", () => {
        deletarBebida(informacao.id)
    })

    const imgLapis = document.createElement("img")
    imgLapis.className = "imgLapis"
    imgLapis.src = "./img/Pencil.png"
    imgLapis.alt = "Editar"

    const imgLixeira = document.createElement("img")
    imgLixeira.className = "imgLixeira"
    imgLixeira.src = "./img/Remove.png"
    imgLixeira.alt = "Deletar"

    btDeletar.appendChild(imgLixeira)
    btAtualizar.appendChild(imgLapis)
    botoes.append(btAtualizar, btDeletar)
    info.append(marca, nome, descricao, valor, botoes)
    boxDrinck.append(foto, litragem)
    card.append(boxDrinck, info)

    return card
}

async function deletarBebida(id){
    const confirm = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Essa ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) return

    try {
        const jwt = localStorage.getItem("jwt")
        const resultado = await deleteBebidas(id, jwt)

        if(resultado){
            Swal.fire({
                title: 'Sucesso!',
                text: 'Bebida deletada com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => criarTelaListaDeBebidas())
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível deletar a bebida!',
                icon: 'error',
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

// ---- Event listeners de navegação ----
document.getElementById("telaBebidas").addEventListener("click", criarTelaListaDeBebidas)
document.getElementById("telaAdd").addEventListener("click", criarTelaInserirBebidas)

// Inicia na tela de bebidas
criarTelaListaDeBebidas()

//Tela de inserção de bebidas

async function criarTelaInserirBebidas(){
    resetNavButtons()
    const pagina = document.getElementById("telaAdd")
    pagina.className = "click"

    const container = document.getElementById("container")
    container.innerHTML = ""

    const h2 = document.createElement("h2")
    h2.textContent = "Adicionar nova bebida"

    const frase = document.createElement("span")
    frase.textContent = "Preencha as informações abaixo para cadastrar um novo item no cardápio."
    frase.className = "frase"

    container.append(h2, frase)

    // ---- Seção: Informações Básicas ----
    const sctInformacaoBasica = document.createElement("section")
    sctInformacaoBasica.className = "secao-form"

    const lblSecaoInfo = document.createElement("h4")
    lblSecaoInfo.className = "secao-titulo"
    lblSecaoInfo.innerHTML = "&#x2139;&#xFE0F; Informações básicas"

    // Nome
    const grupoNome = criarGrupoInput("Nome da bebida *", "text", "inp-nome", "Ex: Limonada Suíça Premium")

    // Descrição
    const grupoDesc = document.createElement("div")
    grupoDesc.className = "grupo-input"
    const lblDesc = document.createElement("label")
    lblDesc.textContent = "Descrição *"
    lblDesc.htmlFor = "inp-descricao"
    const textareaDesc = document.createElement("textarea")
    textareaDesc.id = "inp-descricao"
    textareaDesc.className = "input-field textarea-field"
    textareaDesc.placeholder = "Descreva a bebida..."
    textareaDesc.rows = 3
    grupoDesc.append(lblDesc, textareaDesc)

    // Categoria (GET da API)
    const grupoCategoria = document.createElement("div")
    grupoCategoria.className = "grupo-input"
    const lblCategoria = document.createElement("label")
    lblCategoria.textContent = "Categoria *"
    lblCategoria.htmlFor = "sel-categoria"
    const selCategoria = document.createElement("select")
    selCategoria.id = "sel-categoria"
    selCategoria.className = "input-field"
    const optCatDefault = document.createElement("option")
    optCatDefault.value = ""
    optCatDefault.textContent = "Selecione..."
    selCategoria.appendChild(optCatDefault)
    grupoCategoria.append(lblCategoria, selCategoria)

    // Carregar categorias
    try {
        const resCat = await getListarCategoria()
        const categorias = resCat.response?.categorias || resCat.response || resCat || []
        const arr = Array.isArray(categorias) ? categorias : []
        arr.forEach(cat => {
            const opt = document.createElement("option")
            opt.value = cat.id
            opt.textContent = cat.nome_categoria
            selCategoria.appendChild(opt)
        })
    } catch(e) {
        console.warn("Erro ao carregar categorias:", e)
    }

    const btDescartarInfo = criarBotaoDescartar("🗑 Descartar", () => {
        grupoNome.querySelector("input").value = ""
        textareaDesc.value = ""
        selCategoria.value = ""
    })

    sctInformacaoBasica.append(lblSecaoInfo, grupoNome, grupoDesc, grupoCategoria, btDescartarInfo)

    // ---- Seção: Imagem do produto ----
    const sctImagemProduto = document.createElement("section")
    sctImagemProduto.className = "secao-form"

    const lblSecaoImg = document.createElement("h4")
    lblSecaoImg.className = "secao-titulo"
    lblSecaoImg.innerHTML = "&#x1F5BC;&#xFE0F; Imagem do produto"

    let urlImagemCloudinary = ""

    const areaUpload = document.createElement("div")
    areaUpload.className = "area-upload"
    areaUpload.id = "area-upload"

    const iconeUpload = document.createElement("span")
    iconeUpload.className = "icone-upload"
    iconeUpload.innerHTML = "&#x2B06;"

    const textoUpload = document.createElement("p")
    textoUpload.className = "texto-upload"
    textoUpload.textContent = "Arraste uma foto ou clique para fazer upload"

    const subTextoUpload = document.createElement("span")
    subTextoUpload.className = "subtexto-upload"
    subTextoUpload.textContent = "PNG, JPG ou WEBP · máx. 5 MB · recomendado 800×800px"

    const inputFile = document.createElement("input")
    inputFile.type = "file"
    inputFile.accept = "image/png,image/jpeg,image/webp"
    inputFile.style.display = "none"
    inputFile.id = "inp-foto"

    const imgPreview = document.createElement("img")
    imgPreview.className = "img-preview"
    imgPreview.style.display = "none"
    imgPreview.alt = "Preview da imagem"

    const loadingUpload = document.createElement("span")
    loadingUpload.className = "loading-upload"
    loadingUpload.textContent = "Enviando imagem..."
    loadingUpload.style.display = "none"

    areaUpload.append(iconeUpload, textoUpload, subTextoUpload, inputFile, imgPreview, loadingUpload)

    areaUpload.addEventListener("click", () => inputFile.click())

    inputFile.addEventListener("change", async (e) => {
        const file = e.target.files[0]
        if (!file) return

        iconeUpload.style.display = "none"
        textoUpload.style.display = "none"
        subTextoUpload.style.display = "none"
        imgPreview.style.display = "none"
        loadingUpload.style.display = "block"

        try {
            urlImagemCloudinary = await uploadParaCloudinary(file)
            imgPreview.src = urlImagemCloudinary
            imgPreview.style.display = "block"
            loadingUpload.style.display = "none"

            // Adiciona texto para trocar imagem
            textoUpload.textContent = "Clique para trocar a imagem"
            textoUpload.style.display = "block"
            textoUpload.className = "texto-upload trocar-img"
        } catch (err) {
            loadingUpload.style.display = "none"
            iconeUpload.style.display = "block"
            textoUpload.textContent = "Arraste uma foto ou clique para fazer upload"
            textoUpload.style.display = "block"
            subTextoUpload.style.display = "block"
            Swal.fire({ title: 'Erro!', text: 'Falha ao enviar imagem: ' + err.message, icon: 'error', confirmButtonText: 'Ok' })
        }
    })

    sctImagemProduto.append(lblSecaoImg, areaUpload)

    // ---- Seção: Preço, litragem e tipo embalagem ----
    const sctTipo = document.createElement("section")
    sctTipo.className = "secao-form"

    const lblSecaoTipo = document.createElement("h4")
    lblSecaoTipo.className = "secao-titulo"
    lblSecaoTipo.innerHTML = "$ Preço, litragem e tipo embalagem"

    const gruposTipo = document.createElement("div")
    gruposTipo.className = "grupo-linha"

    // Litragem (fixo)
    const grupoLitragem = document.createElement("div")
    grupoLitragem.className = "grupo-input"
    const lblLitragem = document.createElement("label")
    lblLitragem.textContent = "Litragem"
    const selLitragem = document.createElement("select")
    selLitragem.id = "sel-litragem"
    selLitragem.className = "input-field"
    const litragens = ["150ml","200ml","250ml","300ml","310ml","330ml","350ml","473ml","500ml","600ml","750ml","1L","1.5L","2L"]
    litragens.forEach(l => {
        const opt = document.createElement("option")
        opt.value = l
        opt.textContent = l
        selLitragem.appendChild(opt)
    })
    grupoLitragem.append(lblLitragem, selLitragem)

    // Preço
    const grupoPreco = criarGrupoInput("Preço *", "number", "inp-preco", "0,00")
    grupoPreco.querySelector("input").min = "0"
    grupoPreco.querySelector("input").step = "0.01"

    // Tipo embalagem (GET da API)
    const grupoEmbalagem = document.createElement("div")
    grupoEmbalagem.className = "grupo-input"
    const lblEmbalagem = document.createElement("label")
    lblEmbalagem.textContent = "Tipo embalagem"
    const selEmbalagem = document.createElement("select")
    selEmbalagem.id = "sel-embalagem"
    selEmbalagem.className = "input-field"
    const optEmbDefault = document.createElement("option")
    optEmbDefault.value = ""
    optEmbDefault.textContent = "Selecione..."
    selEmbalagem.appendChild(optEmbDefault)
    grupoEmbalagem.append(lblEmbalagem, selEmbalagem)

    try {
        const resEmb = await getListarTipoEmbalagem()
        const embalagens = resEmb.response?.tipos_embalagem || resEmb.response || resEmb || []
        const arrEmb = Array.isArray(embalagens) ? embalagens : []
        arrEmb.forEach(emb => {
            const opt = document.createElement("option")
            opt.value = emb.id
            opt.textContent = emb.tipo_embalagem
            selEmbalagem.appendChild(opt)
        })
    } catch(e) {
        console.warn("Erro ao carregar embalagens:", e)
    }

    const btDescartarTipo = criarBotaoDescartar("🗑 Descartar", () => {
        selLitragem.value = selLitragem.options[0]?.value || ""
        grupoPreco.querySelector("input").value = ""
        selEmbalagem.value = ""
    })

    gruposTipo.append(grupoLitragem, grupoPreco, grupoEmbalagem)
    sctTipo.append(lblSecaoTipo, gruposTipo, btDescartarTipo)

    // ---- Seção: Gaseificação e Alcoólico ----
    const sctCaracteristicas = document.createElement("section")
    sctCaracteristicas.className = "secao-form"

    const lblSecaoCarac = document.createElement("h4")
    lblSecaoCarac.className = "secao-titulo"
    lblSecaoCarac.innerHTML = "&#x1F4A7; Gaseificação e Alcoólico"

    const gruposCarac = document.createElement("div")
    gruposCarac.className = "grupo-linha"

    // Gaseificada (fixo)
    const grupoGaseificada = document.createElement("div")
    grupoGaseificada.className = "grupo-input"
    const lblGas = document.createElement("label")
    lblGas.textContent = "Gaseificada"
    const selGas = document.createElement("select")
    selGas.id = "sel-gaseificada"
    selGas.className = "input-field"
    ;["Sim","Não"].forEach(v => {
        const opt = document.createElement("option")
        opt.value = v
        opt.textContent = v
        selGas.appendChild(opt)
    })
    grupoGaseificada.append(lblGas, selGas)

    // Alcoólico (fixo)
    const grupoAlcoolico = document.createElement("div")
    grupoAlcoolico.className = "grupo-input"
    const lblAlc = document.createElement("label")
    lblAlc.textContent = "Alcoólico"
    const selAlc = document.createElement("select")
    selAlc.id = "sel-alcoolico"
    selAlc.className = "input-field"
    ;["Sim","Não"].forEach(v => {
        const opt = document.createElement("option")
        opt.value = v
        opt.textContent = v
        selAlc.appendChild(opt)
    })
    grupoAlcoolico.append(lblAlc, selAlc)

    const btDescartarCarac = criarBotaoDescartar("🗑 Descartar", () => {
        selGas.value = "Sim"
        selAlc.value = "Não"
    })

    gruposCarac.append(grupoGaseificada, grupoAlcoolico)
    sctCaracteristicas.append(lblSecaoCarac, gruposCarac, btDescartarCarac)

    // ---- Botões finais ----
    const rodapeForm = document.createElement("div")
    rodapeForm.className = "rodape-form"

    const btDescartarTudo = criarBotaoDescartar("🗑 Descartar", () => {
        criarTelaInserirBebidas()
    })

    const btSalvar = document.createElement("button")
    btSalvar.textContent = "✓ Salvar"
    btSalvar.className = "bt-salvar"

    btSalvar.addEventListener("click", async () => {
        const nome = document.getElementById("inp-nome").value.trim()
        const descricao = document.getElementById("inp-descricao").value.trim()
        const id_categoria = parseInt(document.getElementById("sel-categoria").value)
        const litragem = document.getElementById("sel-litragem").value
        const preco = parseFloat(document.getElementById("inp-preco").value)
        const id_tipo_embalagem = parseInt(document.getElementById("sel-embalagem").value)
        const gaseificada = document.getElementById("sel-gaseificada").value
        const alcoolico = document.getElementById("sel-alcoolico").value

        if (!nome || !descricao || !id_categoria || !preco || !id_tipo_embalagem) {
            Swal.fire({ title: 'Atenção!', text: 'Preencha todos os campos obrigatórios.', icon: 'warning', confirmButtonText: 'Ok' })
            return
        }

        if (!urlImagemCloudinary) {
            Swal.fire({ title: 'Atenção!', text: 'Envie uma imagem do produto.', icon: 'warning', confirmButtonText: 'Ok' })
            return
        }

        // Buscar características para montar IDs
        let idCaracteristicas = []
        try {
            const resCarac = await getListarCaracteristica()
            const caracs = resCarac.response?.caracteristicas || resCarac.response || resCarac || []
            const arrCaracs = Array.isArray(caracs) ? caracs : []

            if (gaseificada === "Sim") {
                const gasCarac = arrCaracs.find(c => c.nome?.toLowerCase().includes("gaseificad"))
                if (gasCarac) idCaracteristicas.push({ id: gasCarac.id })
            }
            if (alcoolico === "Sim") {
                const alcCarac = arrCaracs.find(c => c.nome?.toLowerCase().includes("alcoól") && !c.nome?.toLowerCase().includes("não") && !c.nome?.toLowerCase().includes("sem"))
                if (alcCarac) idCaracteristicas.push({ id: alcCarac.id })
            } else {
                const semAlcCarac = arrCaracs.find(c => c.nome?.toLowerCase().includes("sem álcool") || c.nome?.toLowerCase().includes("não alcoól"))
                if (semAlcCarac) idCaracteristicas.push({ id: semAlcCarac.id })
            }
        } catch(e) {
            console.warn("Erro ao buscar características:", e)
        }

        // Postar foto primeiro para obter id_foto
        let id_foto = null
        try {
            const jwt = localStorage.getItem("jwt")
            const resFoto = await postFoto({ foto: urlImagemCloudinary }, jwt)
            id_foto = resFoto.response?.id || resFoto.id || 1
        } catch(e) {
            console.warn("Erro ao registrar foto:", e)
            id_foto = 1
        }

        const body = {
            nome,
            litragem,
            descricao,
            id_categoria,
            id_marca: 1,
            id_sabor: 1,
            caracteristica: [idCaracteristicas],
            foto_embalagem: [[
                { id_foto, id_tipo_embalagem, valor: preco }
            ]]
        }

        try {
            const jwt = localStorage.getItem("jwt")
            await postBebidas(body, jwt)
            Swal.fire({ title: 'Sucesso!', text: 'Bebida cadastrada com sucesso!', icon: 'success', confirmButtonText: 'Ok' })
                .then(() => criarTelaListaDeBebidas())
        } catch(e) {
            Swal.fire({ title: 'Erro!', text: 'Não foi possível salvar a bebida.', icon: 'error', confirmButtonText: 'Ok' })
        }
    })

    rodapeForm.append(btDescartarTudo, btSalvar)
    container.append(sctInformacaoBasica, sctImagemProduto, sctTipo, sctCaracteristicas, rodapeForm)
}

// ---- Helpers de formulário ----
function criarGrupoInput(label, tipo, id, placeholder = "") {
    const grupo = document.createElement("div")
    grupo.className = "grupo-input"
    const lbl = document.createElement("label")
    lbl.textContent = label
    lbl.htmlFor = id
    const inp = document.createElement("input")
    inp.type = tipo
    inp.id = id
    inp.className = "input-field"
    inp.placeholder = placeholder
    grupo.append(lbl, inp)
    return grupo
}

function criarBotaoDescartar(texto, handler) {
    const btn = document.createElement("button")
    btn.textContent = texto
    btn.className = "bt-descartar"
    btn.addEventListener("click", handler)
    return btn
}

//Tela de atualização de bebidas

function criarTelaAtualizarBebidas(informacao, foto_embalagem){
    resetNavButtons()
    const container = document.getElementById("container")
    container.innerHTML = ""

    const h2 = document.createElement("h2")
    h2.textContent = "Atualizar bebida"

    const frase = document.createElement("span")
    frase.textContent = `Atualize os dados de: ${informacao?.nome || ""}`
    frase.className = "frase"

    const aviso = document.createElement("p")
    aviso.className = "aviso-construcao"
    aviso.textContent = "Tela de atualização em construção."

    const btVoltar = document.createElement("button")
    btVoltar.textContent = "← Voltar"
    btVoltar.className = "bt-descartar"
    btVoltar.addEventListener("click", criarTelaListaDeBebidas)

    container.append(h2, frase, aviso, btVoltar)
}

//Tela de inserir e atualizar novo user

function inserirCadastroUser(){

}

function criarTelaAlterarCadastroUser(){

}
