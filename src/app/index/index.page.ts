import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, PopoverController } from '@ionic/angular';
import { ToastService } from '../services/toast/toast.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';
import { MenuToolbarComponent } from '../components/menu-toolbar/menu-toolbar.component';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

    listSlides: Array<any> = new Array;
    listNoticias: Array<any> = new Array;
    width = self.innerWidth;

    constructor(private graphql: GraphQlService,
        private router: Router,
        private menuController: MenuController,
        private popoverController: PopoverController,
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

    async abrirPagina(rota, ev?) {
        if (rota == "/produto") {
            const popover = await this.popoverController.create({
                component: MenuToolbarComponent,
                event: ev,
                showBackdrop: false,
                translucent: true,
                cssClass: "popoverToolbar"
            });
            await popover.present();
        } else {
            this.router.navigate([rota])
        }
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

    abrirNoticia(aux) {
        this.router.navigate(["noticia-detalhe/" + aux.url]);
    }

}
