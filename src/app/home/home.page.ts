import { Component, ViewChild } from '@angular/core';
import { IonSlides, AlertController, MenuController } from '@ionic/angular';
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
    imagem: string = "";
    ativado: boolean = true;
    categoria_id: any;
    posicao_id: any;

    imagensSelecionadas: Array<File>;

    arquivoImagemCapa: Array<File>;

    primeiroClicado: boolean = true;
    segundoClicado: boolean = false;
    segundaTela: boolean = false;

    alterar: any = null;

    pesquisa: any;

    listNoticias: any = new Array();
    listCategorias: any = new Array();
    listPosicoes: any = new Array();

    public Editor = ClassicEditor;
    @ViewChild("slideAdd") slideAdd: IonSlides;

    constructor(private graphql: GraphQlService,
        private toast: ToastService,
        private alert: AlertController,
        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.slideAdd.lockSwipes(true);
        this.listar();
    }

    ionViewWillEnter() {
        this.menuController.enable(true);
    }

    listar(pesquisa?) {
        this.graphql.graphql(this.query.getNoticiasPosicoesCategorias("true", pesquisa)).then((data: any) => {
            this.listCategorias = data.data.categorias;
            this.listPosicoes = data.data.posicoes;
            this.listNoticias = data.data.noticias;
        })
    }

    arquivosSelecionados(event) {
        this.imagensSelecionadas = event.target.files;
    }

    fotoPrincipalSelecionada(event) {
        this.arquivoImagemCapa = event.target.files;
    }

    desabilitar() {
        if (this.texto != "" && this.manchete != "" && this.titulo != "" && this.categoria_id && this.posicao_id && this.url != "") {
            return false;
        } else {
            return true;
        }
    }

    proximo(aux?) {
        this.slideAdd.lockSwipes(false);
        this.slideAdd.slideNext();
        this.slideAdd.lockSwipes(true);

        this.segundaTela = true;

        if (aux) {
            this.posicao_id = aux.posicao.id;
            this.categoria_id = aux.categoria.id;

            this.titulo = aux.titulo;
            this.texto = aux.texto;
            this.manchete = aux.manchete;
            this.url = aux.url;
            this.imagem = aux.imagem;

            this.alterar = aux;
        }
    }

    primeiroClicar() {
        this.primeiroClicado = !this.primeiroClicado;

        if (this.primeiroClicado) {
            this.segundoClicado = false;
        }
    }

    segundoClicar() {
        this.segundoClicado = !this.segundoClicado;

        if (this.segundoClicado) {
            this.primeiroClicado = false;
        }
    }

    async excluir(aux) {
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

    async adicionar() {
        if (this.alterar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar essa noticia?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {

                            if (this.imagensSelecionadas || this.arquivoImagemCapa) {


                                if (this.arquivoImagemCapa) {
                                    const fd2 = new FormData();
                                    for (let aux of this.arquivoImagemCapa) {
                                        fd2.append("image", aux, aux.name);
                                    }

                                    this.graphql.post("api/imagem/principal/" + this.alterar.id, fd2).then(data => {
                                        this.arquivoImagemCapa = null;
                                    });
                                }

                                if (this.imagensSelecionadas) {
                                    const fd = new FormData();

                                    for (let aux of this.imagensSelecionadas) {
                                        fd.append("image", aux, aux.name);
                                    }
                                    this.graphql.post("api/imagem/" + this.alterar.id, fd).then(data => {
                                        this.imagensSelecionadas = null;
                                    });
                                }

                                this.graphql.graphql(this.query.updateNoticia(Number(this.alterar.id), { titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id, ativado: this.ativado, imagem: this.imagem })).then(() => {
                                    this.toast.mostrar("Noticia atualizada com sucesso!");

                                    this.voltar();
                                })
                            } else {
                                this.graphql.graphql(this.query.updateNoticia(Number(this.alterar.id), { titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id, ativado: this.ativado, imagem: this.imagem })).then(() => {
                                    this.toast.mostrar("Noticia atualizada com sucesso!");
                                    this.voltar();
                                })
                            }

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
                            this.graphql.graphql(this.query.setNoticia({ titulo: this.titulo, texto: this.texto, manchete: this.manchete, url: this.url, posicao_id: this.posicao_id, categoria_id: this.categoria_id, ativado: this.ativado, imagem: this.imagem })).then((data: any) => {
                                if (this.imagensSelecionadas) {
                                    const fd = new FormData();

                                    for (let aux of this.imagensSelecionadas) {
                                        fd.append("image", aux, aux.name);
                                    }

                                    this.graphql.post("api/imagem/" + data.data.createNoticia.id, fd).then(data => {
                                        this.voltar();
                                        this.toast.mostrar("Noticia criada com sucesso!");
                                    });


                                    const fd2 = new FormData();
                                    for (let aux of this.arquivoImagemCapa) {
                                        fd2.append("image", aux, aux.name);
                                    }
                                    this.graphql.post("api/imagem/principal/" + data.data.createNoticia.id, fd2).then(data => {
                                        this.voltar();
                                    });
                                } else {
                                    this.voltar();
                                    this.toast.mostrar("Noticia criada com sucesso!");
                                }
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
        this.imagensSelecionadas = null;

        this.alterar = null;

        this.segundaTela = false;

        this.listar();

        this.slideAdd.lockSwipes(false);
        this.slideAdd.slidePrev();
        this.slideAdd.lockSwipes(true);
    }
}
