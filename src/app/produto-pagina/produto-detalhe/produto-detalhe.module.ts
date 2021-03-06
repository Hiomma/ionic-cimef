import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutoDetalhePage } from './produto-detalhe.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

const routes: Routes = [
  {
    path: ':id',
    component: ProdutoDetalhePage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    PipeModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdutoDetalhePage]
})
export class ProdutoDetalhePageModule {}
