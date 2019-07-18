import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonSlides } from '@ionic/angular';
import { GraphQlService } from '../services/graphql/graph-ql.service';
import { QueryService } from '../services/query/query.service';

@Component({
    selector: 'app-videos-pagina',
    templateUrl: './videos-pagina.page.html',
    styleUrls: ['./videos-pagina.page.scss'],
})
export class VideosPaginaPage implements OnInit {

    @ViewChild('slideFoto') slideFoto: IonSlides

    listVideos: Array<any> = new Array();
    optionsSlide = { slidesPerView: 3 }

    constructor(private graphql: GraphQlService,

        private menuController: MenuController,
        private query: QueryService) { }

    ngOnInit() {
        this.menuController.close();
        this.menuController.enable(false);

        this.graphql.graphql(this.query.getVideos()).then((data: any) => {
            this.listVideos = data.data.videos;
        })
        
        this.slideFoto.lockSwipes(true);
    }

    moverSlide(direita: boolean) {
        if (direita) {
            this.slideFoto.lockSwipes(false);
            this.slideFoto.slideNext(500);
            this.slideFoto.lockSwipes(true);
        } else {
            this.slideFoto.lockSwipes(false);
            this.slideFoto.slidePrev(500);
            this.slideFoto.lockSwipes(true);
        }
    }
}
