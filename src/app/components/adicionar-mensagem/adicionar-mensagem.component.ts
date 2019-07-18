import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { QueryService } from 'src/app/services/query/query.service';

@Component({
    selector: 'app-adicionar-mensagem',
    templateUrl: './adicionar-mensagem.component.html',
    styleUrls: ['./adicionar-mensagem.component.scss'],
})
export class AdicionarMensagemComponent implements OnInit {

    @Input() mensagem: any;
    atualizar: boolean = false;
    resource: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private query: QueryService,
        private modalController: ModalController,
        private graphql: GraphQlService,
        private alert: AlertController,
        private toast: ToastService) { }

    ngOnInit() {
        this.resource = this.formBuilder.group({
            id: [""],
            nome: ["", [Validators.required, Validators.minLength(5)]],
            titulo: ["", [Validators.required, Validators.minLength(5)]],
            email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
            mensagem: ["", [Validators.required, Validators.minLength(5)]],
            createdAt: [""]
        })

        if (this.mensagem) {
            this.resource.setValue(this.mensagem);

            this.atualizar = true;
        }

        this.resource.removeControl("id");
        this.resource.removeControl("createdAt");
    }

    async adicionar() {

        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar esse mensagem?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateMensagem(Number(this.mensagem.id), this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Mensagem atualizado com sucesso!");
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
                message: "Você tem certeza que quer criar essa mensagem?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setMensagem(this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Mensagem criada com sucesso!");
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
