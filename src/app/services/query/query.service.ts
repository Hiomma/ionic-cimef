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
        return { query: "{ slides { id, nome, descricao, url, subdescricao, ativado, createdAt } noticias(first: 3) { id, titulo, manchete, texto, posicao{ id, nome, ativado, createdAt } imagem, ativado, categoria{ id, nome, ativado, createdAt } url, createdAt }}", variables: null }
    }


    //Slides

    getSlides(ativado: string = "", filter: string = "") {
        if (ativado == "") {
            return { query: "query rusbe($filter: String!){ slides(filter: $filter) { id, nome, descricao, url, ativado, subdescricao, createdAt } }", variables: { filter: filter } }
        } else {
            return { query: "query rusbe($ativado: Boolean!, $filter: String!){ slides(ativado: $ativado, filter: $filter) { id, nome, descricao, url, ativado, subdescricao, createdAt } }", variables: { ativado: ativado == "true" ? true : false, filter: filter } }
        }
    }

    // setCategoria(categoria: any) {
    //     return { query: "mutation rusbe($categoria: CategoriaInput!) { createCategoria(categoria: $categoria) { id nome ativado createdAt}}", variables: { "categoria": categoria }, operationName: "rusbe" }
    // }

    // updateCategoria(id: number, categoria: any) {
    //     return { query: "mutation rusbe($id:Int!, $categoria: CategoriaInput!) { updateCategoria(id: $id, categoria: $categoria) { id nome ativado createdAt}}", variables: { id: id, categoria: categoria }, operationName: "rusbe" }
    // }

    // delCategoria(id: number) {
    //     return { query: "mutation rusbe($id:Int!) { deleteCategoria(id: $id) { id nome ativado createdAt}}", variables: { id: id }, operationName: "rusbe" }
    // }
}


