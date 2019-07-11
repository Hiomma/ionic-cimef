import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../../services/graphql/graph-ql.service';
import { MenuController, ModalController } from '@ionic/angular';
import { QueryService } from '../../services/query/query.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalImagemComponent } from 'src/app/components/modal-imagem/modal-imagem.component';


@Component({
    selector: 'app-noticia-detalhe',
    templateUrl: './noticia-detalhe.page.html',
    styleUrls: ['./noticia-detalhe.page.scss'],
})
export class NoticiaDetalhePage implements OnInit {

    noticia: any;

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private query: QueryService,
        private modal: ModalController,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getNoticia(this.route.snapshot.paramMap.get("url"))).then((data: any) => {
            this.noticia = data.data.noticia;
            this.noticia.imagem = environment.url + this.noticia.imagem;
            console.log(this.noticia)

        })
    }

    async abrirImagem() {
        const modal = await this.modal.create({
            component: ModalImagemComponent,
            componentProps: { noticia: this.noticia }
        });
        await modal.present();
    }
}
