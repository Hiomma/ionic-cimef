import { Component, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { ToastService } from '../services/toast/toast.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    texto: string = "";
    manchete: string = "";
    titulo: string = "";
    url: string = "";
    imagem: any;
    categoria_id: any;
    posicao_id: any;

    alterar: any = null;

    listNoticias: any = new Array();
    listCategorias: any = new Array();
    listPosicoes: any = new Array();

    public Editor = ClassicEditor;
    @ViewChild("slideAdd") slideAdd: IonSlides;

    constructor(private graphql: GraphQlService,
        private toast: ToastService,
        private alert: AlertController,
        private query: QueryService) { }

    ngOnInit() {
        this.slideAdd.lockSwipes(true);
        this.listar();
    }

    listar(){
        this.graphql.graphql(this.query.getNoticiasPosicoesCategorias("true")).then((data: any) => {
            this.listCategorias = data.data.categorias;
            this.listPosicoes = data.data.posicoes;
            this.listNoticias = data.data.noticias;
        })
    }

    desabilitar() {
        if (this.texto != "" && this.manchete != "" && this.titulo != "" && this.categoria_id && this.posicao_id) {
            return false;
        } else {
            return true;
        }
    }

    proximo(aux?) {
        this.slideAdd.lockSwipes(false);
        this.slideAdd.slideNext();
        this.slideAdd.lockSwipes(true);

        if (aux) {
            this.posicao_id = aux.posicao.id;
            this.categoria_id = aux.categoria.id;
                        
            this.titulo = aux.titulo;
            this.texto = aux.texto;
            this.manchete = aux.manchete;
            this.url = aux.url;

            this.alterar = aux;
        }
    }

    async excluir(aux){
        const alert = await this.alert.create({
            header: 'Alerta',
            message: "Você tem certeza que deseja deletar essa Notícia?",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        this.graphql.graphql(this.query.delNoticia(Number(aux.id))).then(data => {
                            this.listar();
                            this.toast.mostrar("A notícia foi excluida com sucesso!");
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

    async adicionar() {
        if (this.alterar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar essa noticia?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateNoticia(Number(this.alterar.id), { titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id })).then(() => {
                                this.toast.mostrar("Noticia atualizada com sucesso!");
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
                message: "Você tem certeza que quer criar essa noticia?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.setNoticia({ titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id  })).then(() => {
                                this.toast.mostrar("Noticia criada com sucesso!");
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

    voltar() {
        this.posicao_id = null;
        this.categoria_id = null;
        this.titulo = "";
        this.texto = "";
        this.manchete = "";
        this.url = "";

        this.alterar = null;

        this.slideAdd.lockSwipes(false);
        this.slideAdd.slidePrev();
        this.slideAdd.lockSwipes(true);
    }
}
