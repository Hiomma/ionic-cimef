import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { AdicionarMensagemComponent } from '../components/adicionar-mensagem/adicionar-mensagem.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-mensagem-crud',
    templateUrl: './mensagem-crud.page.html',
    styleUrls: ['./mensagem-crud.page.scss'],
})
export class MensagemCrudPage implements OnInit {
    
    listMensagens: any = new Array();
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
        this.graphql.graphql(this.query.getMensagens(pesquisa)).then((data: any) => {
            this.listMensagens = data.data.mensagens;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar esse Mensagem?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delMensagem(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("O mensagem foi excluida com sucesso!");
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
            component: AdicionarMensagemComponent,
            componentProps: { mensagem: aux },
            cssClass: "modalAdicionarMensagem"
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }

}
