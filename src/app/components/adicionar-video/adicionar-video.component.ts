import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { QueryService } from 'src/app/services/query/query.service';

@Component({
    selector: 'app-adicionar-video',
    templateUrl: './adicionar-video.component.html',
    styleUrls: ['./adicionar-video.component.scss'],
})
export class AdicionarVideoComponent implements OnInit {

    @Input() video: any;
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
            url: ["", [Validators.required, Validators.minLength(5)]],
            ativado: [true, [Validators.required]],
            createdAt: [""]
        })

        if (this.video) {
            this.resource.setValue(this.video);
                        
            this.atualizar = true;
        }

        this.resource.removeControl("id");
        this.resource.removeControl("createdAt");
    }

    async adicionar() {

        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar esse vídeo?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateVideo(Number(this.video.id), this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Video atualizado com sucesso!");
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
                message: "Você tem certeza que quer criar essa vídeo?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setVideo(this.resource.value)).then(() => {
                                this.modalController.dismiss();
                                this.toast.mostrar("Video criada com sucesso!");
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
