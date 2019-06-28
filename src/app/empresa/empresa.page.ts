import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.page.html',
    styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

    listEmpresas: Array<any> = new Array();
    listEmpresasDestaque: Array<any> = new Array();

    constructor(private graphql: GraphQlService,
        private router: Router,
        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getEmpresaDestaque()).then((data: any) => {
            this.listEmpresas = data.data.empresas;
            this.listEmpresasDestaque = data.data.empresasDestaque;

            this.listEmpresas.forEach(element => {
                element.url = environment.url + element.url;
            })

            this.listEmpresasDestaque.forEach(element => {
                element.url = environment.url + element.url;
            })
        })
    }

    abrirPagina(rota) {
        this.router.navigate([rota])
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

}
