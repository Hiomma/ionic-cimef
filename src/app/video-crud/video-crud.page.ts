import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AdicionarVideoComponent } from '../components/adicionar-video/adicionar-video.component';
import { QueryService } from '../services/query/query.service';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-video-crud',
  templateUrl: './video-crud.page.html',
  styleUrls: ['./video-crud.page.scss'],
})
export class VideoCrudPage implements OnInit {

    listVideos: any = new Array();
    pesquisa: any;

    constructor(private modalController: ModalController,
        private query: QueryService,
        private toast: ToastService,
        private alert: AlertController,
        private graphql: GraphQlService) { }

    ngOnInit() {
        this.listar();
    }

    listar(pesquisa?) {
        this.graphql.graphql(this.query.getVideos("true", pesquisa)).then((data: any) => {
            this.listVideos = data.data.videos;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar essa Video?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delVideo(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("A video foi excluida com sucesso!");
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
            component: AdicionarVideoComponent,
            componentProps: { video: aux },
            cssClass: "modalAdicionarVideo"
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }
}
