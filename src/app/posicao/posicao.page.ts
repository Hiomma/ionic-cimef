import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdicionarPosicaoComponent } from '../components/adicionar-posicao/adicionar-posicao.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-posicao',
    templateUrl: './posicao.page.html',
    styleUrls: ['./posicao.page.scss'],
})
export class PosicaoPage implements OnInit {

    listPosicoes: any = new Array();

    constructor(private modalController: ModalController,
        private query: QueryService,
        private toast: ToastService,
        private alert: AlertController,
        private graphql: GraphQlService) { }

    ngOnInit() {
        this.listar();
    }

    listar() {
        this.graphql.graphql(this.query.getPosicoes("true")).then((data: any) => {
            this.listPosicoes = data.data.posicoes;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar essa Posição?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delPosicao(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("A posição foi excluida com sucesso!");
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
            component: AdicionarPosicaoComponent,
            componentProps: { posicao: aux }
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }

}
