import { Component, OnInit, Input } from '@angular/core';
import { QueryService } from 'src/app/services/query/query.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'app-adicionar-slide',
    templateUrl: './adicionar-slide.component.html',
    styleUrls: ['./adicionar-slide.component.scss'],
})
export class AdicionarSlideComponent implements OnInit {

    @Input() slide: any;
    descricao: string = "";
    subdescricao: string = "";
    imagensSelecionadas: any;
    arquivosSelecionados: any;
    ativado: boolean = true;
    nome: string = "";

    atualizar: boolean = false;

    constructor(private query: QueryService,
        private modalController: ModalController,
        private graphql: GraphQlService,
        private alert: AlertController,
        private toast: ToastService) { }

    ngOnInit() {
        if (this.slide) {
            this.descricao = this.slide.descricao;
            this.subdescricao = this.slide.subdescricao;
            this.ativado = this.slide.ativado;
            this.nome = this.slide.nome;

            this.atualizar = true;
        }
    }

    desabilitar() {
        if (this.nome != "" && this.descricao != "" && this.subdescricao != "") {
            return false;
        } else {
            return true;
        }
    }

    async adicionar() {
        // if (this.atualizar) {
        //     const alert = await this.alert.create({
        //         header: 'Alerta',
        //         message: "Você tem certeza que quer atualizar esse slide?",
        //         buttons: [
        //             {
        //                 text: "OK",
        //                 handler: () => {
        //                     const fd = new FormData();

        //                     for (let aux of this.imagensSelecionadas) {
        //                         fd.append("image", aux, aux.name);
        //                     }

        //                     this.graphql.post("api/imagem/" + this.alterar.id, fd).then(data => {
        //                         this.voltar();
        //                         this.graphql.graphql(this.query.updateNoticia(Number(this.alterar.id), { titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id, ativado: this.ativado, imagem: "" })).then(() => {
        //                             this.toast.mostrar("Noticia atualizada com sucesso!");

        //                         })
        //                     })


        //                     this.graphql.graphql(this.query.updateSlide(Number(this.slide.id), { nome: this.nome, ativado: this.ativado })).then(() => {
        //                         this.modalController.dismiss();
        //                         this.toast.mostrar("Posição atualizada com sucesso!");
        //                     })
        //                 }
        //             },
        //             {
        //                 text: "Cancelar"
        //             }
        //         ]
        //     });

        //     await alert.present();
        // } else {
        //     const alert = await this.alert.create({
        //         header: 'Alerta',
        //         message: "Você tem certeza que quer criar esse slide?",
        //         buttons: [
        //             {
        //                 text: "OK",
        //                 handler: () => {
        //                     this.graphql.graphql(this.query.setSlide({ nome: this.nome, ativado: this.ativado })).then(() => {
        //                         this.modalController.dismiss();
        //                         this.toast.mostrar("Posição criada com sucesso!");

        //                         const fd = new FormData();

        //                         for (let aux of this.imagensSelecionadas) {
        //                             fd.append("image", aux, aux.name);
        //                         }

        //                         this.graphql.post("api/imagem/" + data.data.createNoticia.id, fd).then(data => {
        //                             this.voltar();
        //                             this.toast.mostrar("Noticia criada com sucesso!");
        //                         });
        //                     })
        //                 }
        //             },
        //             {
        //                 text: "Cancelar"
        //             }
        //         ]
        //     });

        //     await alert.present();
        // }
    }

    cancelar() {
        this.modalController.dismiss();
    }


}
