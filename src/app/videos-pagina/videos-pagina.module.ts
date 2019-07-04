import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideosPaginaPage } from './videos-pagina.page';
import { PipeModule } from '../pipes/pipe.module';
import { ComponentsModule } from '../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: VideosPaginaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideosPaginaPage]
})
export class VideosPaginaPageModule {}
