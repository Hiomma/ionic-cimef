import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { ToastService } from '../services/toast/toast.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    listSlides: Array<any> = new Array;
    listNoticias: Array<any> = new Array;

    constructor(private graphql: GraphQlService,
        private toast: ToastService,
        private alert: AlertController,
        private router: Router,
        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getHome()).then((data: any) => {
            this.listSlides = data.data.slides;
            this.listNoticias = data.data.noticias;

            this.listNoticias.forEach(element => {
                element.imagem = environment.url + element.imagem;
            })

            this.listSlides.forEach(element => {
                element.url = environment.url + element.url;
            })
        })
    }

    abrirPagina(rota) {
        this.router.navigate([rota])
    }

}
