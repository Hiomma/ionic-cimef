import { Component, OnInit } from '@angular/core';
import { GraphQlService } from '../../services/graphql/graph-ql.service';
import { MenuController, ModalController } from '@ionic/angular';
import { QueryService } from '../../services/query/query.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalImagemComponent } from 'src/app/components/modal-imagem/modal-imagem.component';

@Component({
    selector: 'app-produto-detalhe',
    templateUrl: './produto-detalhe.page.html',
    styleUrls: ['./produto-detalhe.page.scss'],
})
export class ProdutoDetalhePage implements OnInit {

    produto: any;

    constructor(private graphql: GraphQlService,
        private menuController: MenuController,
        private query: QueryService,
        private modal: ModalController,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getProduto(this.route.snapshot.paramMap.get("id"))).then((data: any) => {
            this.produto = data.data.produto;
            this.produto.imagem = environment.url + this.produto.imagem;
            console.log(this.produto)

        })
    }

    async abrirImagem() {
        const modal = await this.modal.create({
            component: ModalImagemComponent,
            componentProps: { objeto: this.produto }
        });
        await modal.present();
    }

}
