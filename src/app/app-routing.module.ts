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
    { path: 'index', loadChildren: './index/index.module#IndexPageModule' },  { path: 'slide', loadChildren: './slide/slide.module#SlidePageModule' },
  { path: 'noticia', loadChildren: './noticia/noticia.module#NoticiaPageModule' },
  { path: 'empresa', loadChildren: './empresa/empresa.module#EmpresaPageModule' },
  { path: 'assistencia-tecnica', loadChildren: './assistencia-tecnica/assistencia-tecnica.module#AssistenciaTecnicaPageModule' },
  { path: 'produto-pagina', loadChildren: './produto-pagina/produto-pagina.module#ProdutoPaginaPageModule' },
  { path: 'depoimentos-pagina', loadChildren: './depoimentos-pagina/depoimentos-pagina.module#DepoimentosPaginaPageModule' },
  { path: 'videos-pagina', loadChildren: './videos-pagina/videos-pagina.module#VideosPaginaPageModule' },
  { path: 'noticia-pagina', loadChildren: './noticia-pagina/noticia-pagina.module#NoticiaPaginaPageModule' },
  { path: 'fale-conosco', loadChildren: './fale-conosco/fale-conosco.module#FaleConoscoPageModule' }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
