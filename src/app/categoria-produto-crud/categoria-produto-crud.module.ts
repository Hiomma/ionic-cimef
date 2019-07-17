import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriaProdutoCrudPage } from './categoria-produto-crud.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaProdutoCrudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriaProdutoCrudPage]
})
export class CategoriaProdutoCrudPageModule {}
