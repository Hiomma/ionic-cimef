import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { AdicionarDepoimentoComponent } from '../components/adicionar-depoimento/adicionar-depoimento.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-depoimento-crud',
    templateUrl: './depoimento-crud.page.html',
    styleUrls: ['./depoimento-crud.page.scss'],
})
export class DepoimentoCrudPage implements OnInit {

    listDepoimentos: any = new Array();
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
        this.graphql.graphql(this.query.getDepoimentos("true", pesquisa)).then((data: any) => {
            this.listDepoimentos = data.data.depoimentos;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar esse Depoimento?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delDepoimento(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("O depoimento foi excluida com sucesso!");
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
            component: AdicionarDepoimentoComponent,
            componentProps: { depoimento: aux },
            cssClass: "modalAdicionarDepoimento"
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }
}
