import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AssistenciaTecnicaPage } from './assistencia-tecnica.page';

const routes: Routes = [
  {
    path: '',
    component: AssistenciaTecnicaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AssistenciaTecnicaPage]
})
export class AssistenciaTecnicaPageModule {}
