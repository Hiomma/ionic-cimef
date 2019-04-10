import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/services/query/query.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'app-adicionar-posicao',
    templateUrl: './adicionar-posicao.component.html',
    styleUrls: ['./adicionar-posicao.component.scss'],
})
export class AdicionarPosicaoComponent implements OnInit {

    @Input() posicao: any;
    nome: string = "";
    ativado: boolean = true;

    atualizar: boolean = false;

    constructor(private query: QueryService,
        private modalController: ModalController,
        private graphql: GraphQlService,
        private alert: AlertController,
        private toast: ToastService) { }

    ngOnInit() {
        if (this.posicao) {
            this.nome = this.posicao.nome;
            this.ativado = this.posicao.ativado;

            this.atualizar = true;
        }
    }

    desabilitar() {
        if (this.nome != "") {
            return false;
        } else {
            return true;
        }
    }

    async adicionar() {
        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar essa posição?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updatePosicao(Number(this.posicao.id), { nome: this.nome, ativado: this.ativado })).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Posição atualizada com sucesso!");
                            })
                        }
                    },
                    {
                        text: "Cancelar"
                    }
                ]
            });

            await alert.present();
        } else {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer criar essa posição?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setPosicao({ nome: this.nome, ativado: this.ativado })).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Posição criada com sucesso!");
                            })
                        }
                    },
                    {
                        text: "Cancelar"
                    }
                ]
            });

            await alert.present();
        }
    }

    cancelar() {
        this.modalController.dismiss();
    }

}
