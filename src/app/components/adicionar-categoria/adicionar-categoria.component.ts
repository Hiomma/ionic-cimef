import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/services/query/query.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'app-adicionar-categoria',
    templateUrl: './adicionar-categoria.component.html',
    styleUrls: ['./adicionar-categoria.component.scss'],
})
export class AdicionarCategoriaComponent implements OnInit {

    @Input() categoria: any;

    nome: string = "";
    ativado: boolean = true;

    atualizar: boolean = false;

    constructor(private query: QueryService,
        private modalController: ModalController,
        private graphql: GraphQlService,
        private alert: AlertController,
        private toast: ToastService) { }

    ngOnInit() {
        if (this.categoria) {
            this.nome = this.categoria.nome;
            this.ativado = this.categoria.ativado;

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
                message: "Você tem certeza que quer atualizar essa categoria?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateCategoria(Number(this.categoria.id), { nome: this.nome, ativado: this.ativado })).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Categoria atualizada com sucesso!");
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
                message: "Você tem certeza que quer criar essa categoria?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setCategoria({ nome: this.nome, ativado: this.ativado })).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Categoria criada com sucesso!");
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
