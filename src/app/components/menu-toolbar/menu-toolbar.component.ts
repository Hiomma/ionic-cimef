import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { QueryService } from 'src/app/services/query/query.service';

@Component({
    selector: 'app-menu-toolbar',
    templateUrl: './menu-toolbar.component.html',
    styleUrls: ['./menu-toolbar.component.scss'],
})
export class MenuToolbarComponent implements OnInit {

    listCategorias: Array<any>
    sobre: boolean = false;

    constructor(private navParams: NavParams,
        private pop: PopoverController,
        private graphql: GraphQlService,
        private query: QueryService,
        private router: Router) { }

    ngOnInit() {
        this.sobre = this.navParams.get("rota") == "sobre";

        this.graphql.graphql(this.query.getCategoriasProduto("true")).then((data: any) => {
            this.listCategorias = data.data.categorias_produto;
            console.log(this.listCategorias)
        })
    }

    abrirPagina(rota: any) {
        this.router.navigate(["/produto", rota.id])
        this.pop.dismiss();
    }
}
