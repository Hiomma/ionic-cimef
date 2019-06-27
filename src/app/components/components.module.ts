import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdicionarCategoriaComponent } from './adicionar-categoria/adicionar-categoria.component';
import { AdicionarPosicaoComponent } from './adicionar-posicao/adicionar-posicao.component';
import { AdicionarSlideComponent } from './adicionar-slide/adicionar-slide.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [AdicionarCategoriaComponent, AdicionarPosicaoComponent, AdicionarSlideComponent],
    entryComponents: [AdicionarCategoriaComponent, AdicionarPosicaoComponent, AdicionarSlideComponent]
})
export class ComponentsModule { }
