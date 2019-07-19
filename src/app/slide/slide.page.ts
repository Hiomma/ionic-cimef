import { Component, OnInit } from '@angular/core';
import { AdicionarSlideComponent } from '../components/adicionar-slide/adicionar-slide.component';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { QueryService } from '../services/query/query.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.page.html',
    styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

    listSlides: any = new Array();
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
        this.graphql.graphql(this.query.getSlides("true", pesquisa)).then((data: any) => {
            this.listSlides = data.data.slides;
        })
    }

    async excluir(aux) {
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar esse Slide?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delSlides(Number(aux.id))).then(data => {
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
            component: AdicionarSlideComponent,
            componentProps: { slide: aux },
        });
        await modal.present();

        modal.onDidDismiss().then(() => {
            this.listar();
        })
    }

}
