import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    { path: 'categoria', loadChildren: './categoria/categoria.module#CategoriaPageModule' },
    { path: 'posicao', loadChildren: './posicao/posicao.module#PosicaoPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'index', loadChildren: './index/index.module#IndexPageModule' }


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
