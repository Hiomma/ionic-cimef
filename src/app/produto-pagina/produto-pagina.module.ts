import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutoPaginaPage } from './produto-pagina.page';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: ProdutoPaginaPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ProdutoPaginaPage]
})
export class ProdutoPaginaPageModule { }
