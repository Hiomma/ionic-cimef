import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DepoimentoCrudPage } from './depoimento-crud.page';

const routes: Routes = [
  {
    path: '',
    component: DepoimentoCrudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepoimentoCrudPage]
})
export class DepoimentoCrudPageModule {}
