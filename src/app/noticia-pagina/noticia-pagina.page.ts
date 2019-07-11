import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { MenuController } from '@ionic/angular';
import { QueryService } from '../services/query/query.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-noticia-pagina',
    templateUrl: './noticia-pagina.page.html',
    styleUrls: ['./noticia-pagina.page.scss'],
})
export class NoticiaPaginaPage implements OnInit {

    listNoticias: any;

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private route: Router,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getNoticias()).then((data: any) => {
            this.listNoticias = data.data.noticias;

            this.listNoticias.forEach(element => {
                element.imagem = environment.url + element.imagem;
            })
        })
    }

    abrirNoticia(aux) {
        this.route.navigate(["noticia-detalhe/" + aux.url]);
    }
}
