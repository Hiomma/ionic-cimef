import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MensagemCrudPage } from './mensagem-crud.page';

const routes: Routes = [
  {
    path: '',
    component: MensagemCrudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MensagemCrudPage]
})
export class MensagemCrudPageModule {}
