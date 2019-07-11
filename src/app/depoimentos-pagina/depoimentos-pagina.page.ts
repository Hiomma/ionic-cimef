import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-depoimentos-pagina',
    templateUrl: './depoimentos-pagina.page.html',
    styleUrls: ['./depoimentos-pagina.page.scss'],
})
export class DepoimentosPaginaPage implements OnInit {

    listDepoimentos: Array<any> = new Array();

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getDepoimentos()).then((data: any) => {
            this.listDepoimentos = data.data.depoimentos;

            this.listDepoimentos.forEach(element => {
                element.url = environment.url + element.url;
            })
        })
    }

}
