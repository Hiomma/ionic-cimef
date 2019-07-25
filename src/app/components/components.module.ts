import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdicionarCategoriaComponent } from './adicionar-categoria/adicionar-categoria.component';
import { AdicionarPosicaoComponent } from './adicionar-posicao/adicionar-posicao.component';
import { AdicionarSlideComponent } from './adicionar-slide/adicionar-slide.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { ModalImagemComponent } from './modal-imagem/modal-imagem.component';
import { AdicionarCategoriaProdutoComponent } from './adicionar-categoria-produto/adicionar-categoria-produto.component';
import { AdicionarVideoComponent } from './adicionar-video/adicionar-video.component';
import { AdicionarDepoimentoComponent } from './adicionar-depoimento/adicionar-depoimento.component';
import { AdicionarMensagemComponent } from './adicionar-mensagem/adicionar-mensagem.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MenuToolbarComponent } from './menu-toolbar/menu-toolbar.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        CKEditorModule,
    ],
    declarations: [
        AdicionarProdutoComponent,
        AdicionarMensagemComponent,
        AdicionarDepoimentoComponent,
        AdicionarCategoriaProdutoComponent,
        AdicionarVideoComponent,
        AdicionarCategoriaComponent,
        AdicionarPosicaoComponent,
        AdicionarSlideComponent,
        HeaderFooterComponent,
        ModalImagemComponent,
        MenuToolbarComponent
    ],
    entryComponents: [
        MenuToolbarComponent,
        AdicionarProdutoComponent,
        AdicionarMensagemComponent,
        AdicionarDepoimentoComponent,
        AdicionarVideoComponent,
        AdicionarCategoriaProdutoComponent,
        AdicionarCategoriaComponent,
        AdicionarPosicaoComponent,
        AdicionarSlideComponent,
        HeaderFooterComponent,
        ModalImagemComponent
    ],
    exports: [
        HeaderFooterComponent
    ]
})
export class ComponentsModule { }
