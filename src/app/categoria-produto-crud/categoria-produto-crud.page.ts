import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdicionarCategoriaComponent } from '../components/adicionar-categoria/adicionar-categoria.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';
import { AdicionarCategoriaProdutoComponent } from '../components/adicionar-categoria-produto/adicionar-categoria-produto.component';

@Component({
    selector: 'app-categoria-produto-crud',
    templateUrl: './categoria-produto-crud.page.html',
    styleUrls: ['./categoria-produto-crud.page.scss'],
})
export class CategoriaProdutoCrudPage implements OnInit {

    listCategorias: any = new Array();
    pesquisa: any;

    constructor(private modalController: ModalController,
        private query: QueryService,
        private toast: ToastService,
        private alert: AlertController,
        private graphql: GraphQlService) { }

    ngOnInit() {
        this.listar();
    }

    listar(pesquisa?) {
        this.graphql.graphql(this.query.getCategoriasProduto("true", pesquisa)).then((data: any) => {
            this.listCategorias = data.data.categorias_produto;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar essa Categoria?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delCategoriaProduto(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("A categoria foi excluida com sucesso!");
                        });
                    }
                },
                {
                    text: "Cancelar"
                }
            ]
        });

        await alert.present();
    }

    async abrirModal(aux?) {
        const modal = await this.modalController.create({
            component: AdicionarCategoriaProdutoComponent,
            componentProps: { categoria: aux },
            cssClass: "modalAdicionarCategoria"
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }

}
