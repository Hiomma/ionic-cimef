import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QueryService {

    constructor() {
    }

    produtosNaoDeletados() {
        return { query: "{ produtos(deletado: false){ id, nome, valor, descricao }}", variables: null }
    }

    ingredientesProduto(id) {
        return { query: "query ingredientesProduto($id: ID!){ingredientesProduto(id: $id){ id,nome, valor}}", variables: { id: id } }
    }
}
