import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-modal-imagem',
    templateUrl: './modal-imagem.component.html',
    styleUrls: ['./modal-imagem.component.scss'],
})
export class ModalImagemComponent implements OnInit {

    @ViewChild('slideFoto') slideFoto: IonSlides

    @Input() objeto: any;
    listImagens: Array<any> = new Array();

    constructor() { }

    ngOnInit() {
        this.listImagens = JSON.parse(JSON.stringify(this.objeto.imagens));
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
