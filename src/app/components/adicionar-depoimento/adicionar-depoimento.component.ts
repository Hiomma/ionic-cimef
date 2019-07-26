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
    fotoSelecionada: any;

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
            url: [""],
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

    fotoDepoimento(event) {
        this.fotoSelecionada = event.target.files;
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
                                if (this.fotoSelecionada) {
                                    const fd2 = new FormData();

                                    let i = 0;
                                    for (let aux of this.fotoSelecionada) {
                                        fd2.append("image", aux, new Date().getTime() + i + "." + aux.name.split(".")[1]);
                                        i++;
                                    }

                                    this.graphql.post("api/depoimento/imagem/" + this.depoimento.id, fd2).then(data => {
                                        this.fotoSelecionada = null;
                                    });
                                }

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
                            this.graphql.graphql(this.query.setDepoimento(this.resource.value)).then((data: any) => {
                                const fd = new FormData();

                                for (let aux of this.fotoSelecionada) {
                                    fd.append("image", aux, aux.name);
                                }
                                this.graphql.post("api/depoimento/imagem/" + data.data.createDepoimento.id, fd).then(data => {
                                    this.fotoSelecionada = null;
                                });


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
