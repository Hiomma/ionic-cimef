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
    ativado: boolean = true;
    nome: string = "";
    url: string = "";

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
            this.url = this.slide.url;

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

    arquivosSelecionados(event) {
        this.imagensSelecionadas = event.target.files;
    }


    async adicionar() {
        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar esse slide?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateSlide(Number(this.slide.id), { nome: this.nome, descricao: this.descricao, subdescricao: this.subdescricao, ativado: this.ativado, url: this.url })).then(() => {
                                if (this.imagensSelecionadas) {
                                    const fd = new FormData();
                                    let i = 0;
                                    for (let aux of this.imagensSelecionadas) {
                                        fd.append("image", aux, new Date().getTime() + i + "." + aux.name.split(".")[1]);
                                        i++;
                                    }

                                    this.graphql.post("api/slide/imagem/" + this.slide.id, fd).then(data => {
                                    })
                                }

                                this.toast.mostrar("Slide atualizado com sucesso!");
                                this.cancelar();
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
                message: "Você tem certeza que quer criar esse slide?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setSlide({ nome: this.nome, descricao: this.descricao, subdescricao: this.subdescricao, ativado: this.ativado, url: this.url })).then((data: any) => {

                                const fd = new FormData();

                                for (let aux of this.imagensSelecionadas) {
                                    fd.append("image", aux, aux.name);
                                }

                                this.graphql.post("api/slide/imagem/" + data.data.createSlide.id, fd).then(data => {
                                    this.cancelar();
                                    this.toast.mostrar("Slide criado com sucesso!");
                                });
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
