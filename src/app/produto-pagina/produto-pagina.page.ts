import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { MenuController } from '@ionic/angular';
import { QueryService } from '../services/query/query.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
    selector: 'app-produto-pagina',
    templateUrl: './produto-pagina.page.html',
    styleUrls: ['./produto-pagina.page.scss'],
})
export class ProdutoPaginaPage implements OnInit {

    listProdutos: any[] = [];
    listCategorias: any;

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private route: Router,
        private query: QueryService) { }


    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getProdutos()).then((data: any) => {
            this.listCategorias = data.data.categorias_produto;
            let produtos: Array<any> = data.data.produtos;

            produtos.forEach(element => {
                element.imagem = environment.url + element.imagem;
            })

            let i = 0;

            for (let aux of this.listCategorias) {
                this.listProdutos[i] = produtos.filter(element => { if (element.categoria.id == aux.id) { return element } })
                i++;
            }
        })
    }

    abrirProduto(aux) {
        this.route.navigate(["produto-detalhe/" + aux.id]);
    }

}
