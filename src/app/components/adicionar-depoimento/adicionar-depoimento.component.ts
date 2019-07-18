import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { QueryService } from 'src/app/services/query/query.service';

@Component({
    selector: 'app-adicionar-depoimento',
    templateUrl: './adicionar-depoimento.component.html',
    styleUrls: ['./adicionar-depoimento.component.scss'],
})
export class AdicionarDepoimentoComponent implements OnInit {

    @Input() depoimento: any;
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
            descricao: ["", [Validators.required, Validators.minLength(5)]],
            depoimento: ["", [Validators.required, Validators.minLength(5)]],
            url: ["", [Validators.required, Validators.minLength(5)]],
            ativado: [true, [Validators.required]],
            createdAt: [""]
        })

        if (this.depoimento) {
            this.resource.setValue(this.depoimento);

            this.atualizar = true;
        }

        this.resource.removeControl("id");
        this.resource.removeControl("createdAt");
    }

    async adicionar() {

        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar esse depoimento?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateDepoimento(Number(this.depoimento.id), this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Depoimento atualizado com sucesso!");
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
                message: "Você tem certeza que quer criar essa depoimento?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setDepoimento(this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Depoimento criada com sucesso!");
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
