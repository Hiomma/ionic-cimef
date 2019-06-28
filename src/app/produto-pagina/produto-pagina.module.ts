import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProdutoPaginaPage } from './produto-pagina.page';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProdutoPaginaPage]
})
export class ProdutoPaginaPageModule {}
