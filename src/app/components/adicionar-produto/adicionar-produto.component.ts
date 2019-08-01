import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController, MenuController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GraphQlService } from 'src/app/services/graphql/graph-ql.service';
import { QueryService } from 'src/app/services/query/query.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-adicionar-produto',
    templateUrl: './adicionar-produto.component.html',
    styleUrls: ['./adicionar-produto.component.scss'],
})
export class AdicionarProdutoComponent implements OnInit {
    @Input() produto: any;
    atualizar: boolean = false;
    resource: FormGroup;
    produtoSelecionado: any;
    galeriaSelecionada: any;

    listCategorias: any;

    public Editor = ClassicEditor;

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
            video: [""],
            categoria_id: ["", [Validators.required]],
            imagem: [""],
            texto: ["", [Validators.required, Validators.minLength(5)]],
            ativado: [true, [Validators.required]],
            createdAt: [""]
        })

        if (this.produto) {
            this.resource.patchValue(this.produto);
            this.resource.patchValue({ categoria_id: this.produto.categoria.id })

            this.atualizar = true;
        }

        this.resource.removeControl("id");
        this.resource.removeControl("createdAt");

        this.graphql.graphql(this.query.getCategoriasProduto("true")).then((data: any) => {
            this.listCategorias = data.data.categorias_produto;
        })
    }

    galeriaProduto(event) {
        this.galeriaSelecionada = event.target.files;
    }

    imagemProduto(event) {
        this.produtoSelecionado = event.target.files;
    }

    async adicionar() {

        if (this.atualizar) {
            const alert = await this.alert.create({
                header: 'Alerta',
                message: "Você tem certeza que quer atualizar esse produto?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            this.graphql.graphql(this.query.updateProduto(Number(this.produto.id), this.resource.value)).then(() => {
                                if (this.galeriaSelecionada) {
                                    const fd2 = new FormData();

                                    let i = 0;
                                    for (let aux of this.galeriaSelecionada) {
                                        fd2.append("image", aux, new Date().getTime() + i + "." + aux.name.split(".")[1]);
                                        i++
                                    }

                                    this.graphql.post("api/produto/imagem/" + this.produto.id, fd2).then(data => {
                                        this.galeriaSelecionada = null;
                                    });
                                }

                                if (this.produtoSelecionado) {
                                    const fd3 = new FormData();

                                    let i = 0;
                                    for (let aux of this.produtoSelecionado) {
                                        fd3.append("image", aux, new Date().getTime() + i + "." + aux.name.split(".")[1]);
                                        i++;
                                    }
                                    this.graphql.post("api/produto/principal/" + this.produto.id, fd3).then(data => {
                                        this.produtoSelecionado = null;
                                    });
                                }



                                this.modalController.dismiss();
                                this.toast.mostrar("Produto atualizado com sucesso!");
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
                message: "Você tem certeza que quer criar essa produto?",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {


                            this.graphql.graphql(this.query.setProduto(this.resource.value)).then((data: any) => {
                                const fd2 = new FormData();
                                for (let aux of this.galeriaSelecionada) {
                                    fd2.append("image", aux, aux.name);
                                }

                                const fd3 = new FormData();

                                for (let aux of this.produtoSelecionado) {
                                    fd3.append("image", aux, aux.name);
                                }
                                this.graphql.post("api/produto/imagem/" + data.data.createProduto.id, fd3).then(data => {
                                    this.produtoSelecionado = null;
                                });

                                this.graphql.post("api/produto/principal/" + data.data.createProduto.id, fd2).then(data => {
                                    this.galeriaSelecionada = null;
                                });

                                this.modalController.dismiss();
                                this.toast.mostrar("Produto criada com sucesso!");
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
