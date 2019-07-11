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

    listProdutos: any;

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private route: Router,
        private query: QueryService) { }


    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getProdutos()).then((data: any) => {
            this.listProdutos = data.data.produtos;

            this.listProdutos.forEach(element => {
                element.imagem = environment.url + element.imagem;
            })
        })
    }

    abrirProduto(aux) {
        this.route.navigate(["produto-detalhe/" + aux.id]);
    }

}
