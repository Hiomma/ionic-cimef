import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { AdicionarProdutoComponent } from '../components/adicionar-produto/adicionar-produto.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-produto-crud',
    templateUrl: './produto-crud.page.html',
    styleUrls: ['./produto-crud.page.scss'],
})
export class ProdutoCrudPage implements OnInit {


    listProdutos: any = new Array();
    pesquisa: any;

    constructor(private modalController: ModalController,
        private query: QueryService,
        private toast: ToastService,
        private menuController: MenuController,
        private alert: AlertController,
        private graphql: GraphQlService) { }

    ngOnInit() {
        this.listar();
        this.menuController.enable(true);
    }

    listar(pesquisa?) {
        this.graphql.graphql(this.query.getProdutos("true", pesquisa)).then((data: any) => {
            this.listProdutos = data.data.produtos;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar esse Produto?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delProduto(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("O produto foi excluido com sucesso!");
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
            component: AdicionarProdutoComponent,
            componentProps: { produto: aux },
            cssClass: "modalAdicionarProduto"
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }
}
