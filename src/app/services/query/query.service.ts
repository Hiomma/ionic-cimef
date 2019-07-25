import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QueryService {

    constructor() {
    }

    //Posicoes

    getPosicoes(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ posicoes(filter: $filter) { id nome ativado createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ posicoes(ativado: $ativado, filter: $filter) { id nome ativado createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setPosicao(posicao: any) {
        return { query: "mutation rusbe($posicao: PosicaoInput!) { createPosicao(posicao: $posicao) { id nome ativado createdAt}}", variables: { "posicao": posicao }, operationName: "rusbe" }
    }

    updatePosicao(id: number, posicao: any) {
        return { query: "mutation rusbe($id:Int!, $posicao: PosicaoInput!) { updatePosicao(id: $id, posicao: $posicao) { id nome ativado createdAt}}", variables: { id: id, posicao: posicao }, operationName: "rusbe" }
    }

    delPosicao(id: number) {
        return { query: "mutation rusbe($id:Int!) { deletePosicao(id: $id) { id nome ativado createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Categorias

    getCategorias(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ categorias(filter: $filter) { id nome ativado createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ categorias(ativado: $ativado,filter: $filter ) { id nome ativado createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setCategoria(categoria: any) {
        return { query: "mutation rusbe($categoria: CategoriaInput!) { createCategoria(categoria: $categoria) { id nome ativado createdAt}}", variables: { "categoria": categoria }, operationName: "rusbe" }
    }

    updateCategoria(id: number, categoria: any) {
        return { query: "mutation rusbe($id:Int!, $categoria: CategoriaInput!) { updateCategoria(id: $id, categoria: $categoria) { id nome ativado createdAt}}", variables: { id: id, categoria: categoria }, operationName: "rusbe" }
    }

    delCategoria(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteCategoria(id: $id) { id nome ativado createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Noticias

    getNoticia(url) {
        return { query: "query rusbe($url: String!) { noticia(url: $url){ id, titulo, manchete, texto, imagens{ id, url, createdAt }, posicao{ id, nome, ativado, createdAt }, imagem, ativado, categoria{ id, nome, ativado, createdAt }, url, createdAt}} ", variables: { url: url } }
    }

    getNoticias(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!) { noticias(filter: $filter){ id, titulo, manchete, texto, posicao{ id, nome, ativado, createdAt }, imagem, ativado, categoria{ id, nome, ativado, createdAt }, url, createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!) { noticias(ativado: $ativado, filter: $filter){ id, titulo, manchete, texto, posicao{ id, nome, ativado, createdAt }, imagem, ativado, categoria{ id, nome, ativado, createdAt }, url, createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    getNoticiasPosicoesCategorias(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: " query rusbe($filter: String!){  noticias(filter: $filter) { id titulo manchete texto imagem url posicao { id nome ativado createdAt updatedAt } categoria { id nome ativado createdAt updatedAt } createdAt updatedAt  },  posicoes(ativado:true){ id nome ativado createdAt updatedAt  },  categorias(ativado:true){ id nome ativado createdAt updatedAt  }}", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){  noticias(ativado: $ativado, filter: $filter) { id titulo manchete texto imagem url posicao { id nome ativado createdAt updatedAt } categoria { id nome ativado createdAt updatedAt } createdAt updatedAt  },  posicoes(ativado:true){ id nome ativado createdAt updatedAt  },  categorias(ativado:true){ id nome ativado createdAt updatedAt  }}", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setNoticia(noticia: any) {
        return { query: "mutation rusbe($noticia: NoticiaInput!){createNoticia(noticia:$noticia){ id }}", variables: { noticia: noticia }, operationName: "rusbe" }
    }

    updateNoticia(id: number, noticia: any) {
        return { query: "mutation rusbe($id:Int!, $noticia: NoticiaInput!) { updateNoticia(id: $id, noticia: $noticia) { id }}", variables: { id: id, noticia: noticia }, operationName: "rusbe" }
    }

    delNoticia(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteNoticia(id: $id) { id createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //PaginaHome
    getHome() {
        return { query: "{ slides(ativado: true) { id, nome, descricao, url, subdescricao, ativado, createdAt } noticias(first: 3) { id, titulo, manchete, texto, posicao{ id, nome, ativado, createdAt } imagem, ativado, categoria{ id, nome, ativado, createdAt } url, createdAt }}", variables: null }
    }


    //Slides

    getSlides(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ slides(filter: $filter) { id, nome, descricao, url, ativado, subdescricao, createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ slides(ativado: $ativado, filter: $filter) { id, nome, descricao, url, ativado, subdescricao, createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setSlide(slide: any) {
        return { query: "mutation rusbe($slide: SlideInput!) { createSlide(slide: $slide) { id, nome, descricao, url, ativado, subdescricao, createdAt}}", variables: { "slide": slide }, operationName: "rusbe" }
    }

    updateSlide(id: number, slide: any) {
        return { query: "mutation rusbe($id:Int!, $slide: SlideInput!) { updateSlide(id: $id, slide: $slide) {id, nome, descricao, url, ativado, subdescricao, createdAt}}", variables: { id: id, slide: slide }, operationName: "rusbe" }
    }

    delSlides(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteSlide(id: $id) { id, nome, descricao, url, ativado, subdescricao, createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Empresas

    getEmpresaDestaque() {
        return { query: "{ empresas(ativado: true) { id, url, ativado, destaque, createdAt } empresasDestaque: empresas(ativado: true, destaque: true){ id, url, ativado, destaque, createdAt } }", variables: null }
    }

    //Videos

    getVideos(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ videos(filter: $filter){ id, nome, url, ativado, createdAt}}", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ videos(ativado: $ativado, filter: $filter) { id, nome, url, ativado, createdAt} }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setVideo(video: any) {
        return { query: "mutation rusbe($video: VideoInput!) { createVideo(video: $video) { id, nome, url, ativado, createdAt}}", variables: { "video": video }, operationName: "rusbe" }
    }

    updateVideo(id: number, video: any) {
        return { query: "mutation rusbe($id:Int!, $video: VideoInput!) { updateVideo(id: $id, video: $video) {id, nome, url, ativado, createdAt}}", variables: { id: id, video: video }, operationName: "rusbe" }
    }

    delVideo(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteVideo(id: $id) { id, nome, url, ativado, createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Depoimentos

    getDepoimentos(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!) { depoimentos(filter: $filter) { id, nome, descricao, depoimento, url, ativado, createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){depoimentos(ativado: $ativado, filter: $filter) { id, nome, descricao, depoimento, url, ativado, createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setDepoimento(depoimento: any) {
        return { query: "mutation rusbe($depoimento: DepoimentoInput!) { createDepoimento(depoimento: $depoimento) { id, depoimento, nome, url, ativado, createdAt}}", variables: { "depoimento": depoimento }, operationName: "rusbe" }
    }

    updateDepoimento(id: number, depoimento: any) {
        return { query: "mutation rusbe($id:Int!, $depoimento: DepoimentoInput!) { updateDepoimento(id: $id, depoimento: $depoimento) {id, depoimento, nome, url, ativado, createdAt}}", variables: { id: id, depoimento: depoimento }, operationName: "rusbe" }
    }

    delDepoimento(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteDepoimento(id: $id) { id, depoimento, nome, url, ativado, createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Categorias dos Produtos
    getCategoriasProduto(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ categorias_produto(filter: $filter) { id nome ativado createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ categorias_produto(ativado: $ativado,filter: $filter ) { id nome ativado createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setCategoriaProduto(categoria: any) {
        return { query: "mutation rusbe($categoria: CategoriaProdutoInput!) { createCategoriaProduto(categoria: $categoria) { id nome ativado createdAt}}", variables: { "categoria": categoria }, operationName: "rusbe" }
    }

    updateCategoriaProduto(id: number, categoria: any) {
        return { query: "mutation rusbe($id:Int!, $categoria: CategoriaProdutoInput!) { updateCategoriaProduto(id: $id, categoria: $categoria) { id nome ativado createdAt}}", variables: { id: id, categoria: categoria }, operationName: "rusbe" }
    }

    delCategoriaProduto(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteCategoriaProduto(id: $id) { id nome ativado createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }

    //Produtos
    getProdutos(ativado: string = "", filter: string = "") {
        if (ativado == "" && filter == "") {
            return { query: "{ produtos(ativado: true) { id, nome, categoria{ id, nome}, video, texto, imagem,tabela,  ativado, createdAt },  categorias_produto(ativado:true){id, nome, ativado, createdAt}}", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ produtos(ativado: $ativado, filter: $filter) { id, nome, tabela, categoria{ id, nome}, video, texto, imagem, ativado, createdAt }}", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    getProdutosById(id) {
        return { query: "query rusbe($ativado: Boolean!, $id: ID!){ produtos(ativado: $ativado, categoria_id: $id) { id, nome, video, texto,tabela, imagem, categoria{id, nome}, imagens { id, url, createdAt }, ativado, createdAt } }", variables: { ativado: true, id: id } }
    }

    getProduto(id) {
        return { query: "query rusbe($id: ID!){ produto(id: $id) { id, nome, video, texto,tabela, imagem, categoria{id}, imagens { id, url, createdAt }, ativado, createdAt } }", variables: { id: id } }
    }

    setProduto(produto: any) {
        return { query: "mutation rusbe($produto: ProdutoInput!){ createProduto(produto:$produto) { id, nome, video, categoria{id}, texto,tabela, imagem, imagens { id, url, createdAt }, ativado, createdAt } }", variables: { "produto": produto }, operationName: "rusbe" }
    }

    updateProduto(id: number, produto: any) {
        return { query: "mutation rusbe($id:Int!, $produto: ProdutoInput!) { updateProduto(id: $id, produto: $produto) { id, nome, video,  categoria{id},tabela,texto, imagem, imagens { id, url, createdAt }, ativado, createdAt } }", variables: { id: id, produto: produto }, operationName: "rusbe" }
    }

    delProduto(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteProduto(id: $id) { id, nome, video, texto, imagem, tabela, categoria{id},imagens { id, url, createdAt }, ativado, createdAt } }", variables: { id: id }, operationName: "rusbe" }
    }


    //Fale Conosco    
    getMensagens(filter: string = "") {
        return { query: "query rusbe($filter: String!){ mensagens(filter: $filter){ id, mensagem, nome, titulo, email, createdAt}}", variables: { filter: filter } }
    }

    getMensagem(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ mensagem(filter: $filter){ id, mensagem, nome, titulo, email, createdAt} }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ mensagem(ativado: $ativado,filter: $filter ) { id, mensagem, nome, titulo, email, createdAt}}", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    setMensagem(mensagem: any) {
        return { query: "mutation rusbe($mensagem: MensagemInput!){ createMensagem(mensagem:$mensagem){ id, mensagem, nome, titulo, email, createdAt}}", variables: { "mensagem": mensagem }, operationName: "rusbe" }
    }

    updateMensagem(id: number, mensagem: any) {
        return { query: "mutation rusbe($id:Int!, $mensagem: MensagemInput!) { updateMensagem(id: $id, mensagem: $mensagem){ id, mensagem, nome, titulo, email, createdAt}}", variables: { id: id, mensagem: mensagem }, operationName: "rusbe" }
    }

    delMensagem(id: number) {
        return { query: "mutation rusbe($id:Int!) { deleteMensagem(id: $id) { id, mensagem, nome, titulo, email, createdAt}}", variables: { id: id }, operationName: "rusbe" }
    }


}



