import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.page.html',
    styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

    @ViewChild('slideFoto') slideFoto: IonSlides

    listEmpresas: Array<any> = new Array();
    listEmpresasDestaque: Array<any> = new Array();

    constructor(private graphql: GraphQlService,
        private router: Router,
        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getEmpresaDestaque()).then((data: any) => {
            this.listEmpresas = data.data.empresas;
            this.listEmpresasDestaque = data.data.empresasDestaque;
            
            this.listEmpresas.forEach(element => {
                element.url = environment.url + element.url;
            })
            
            this.listEmpresasDestaque.forEach(element => {
                element.url = environment.url + element.url;
            })
        })
        this.slideFoto.lockSwipes(true);
    }

    moverSlide(direita: boolean) {
        if (direita) {
            this.slideFoto.lockSwipes(false);
            this.slideFoto.slideNext(500);
            this.slideFoto.lockSwipes(true);
        }else{
            this.slideFoto.lockSwipes(false);
            this.slideFoto.slidePrev(500);
            this.slideFoto.lockSwipes(true);
        }
    }
}
