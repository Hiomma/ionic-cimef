import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IonSlides, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-imagem',
    templateUrl: './modal-imagem.component.html',
    styleUrls: ['./modal-imagem.component.scss'],
})
export class ModalImagemComponent implements OnInit {

    @ViewChild('slideFoto') slideFoto: IonSlides

    @Input() objeto: any;
    listImagens: Array<any> = new Array();

    constructor(private route: Router,
        private modalCtrl: ModalController) { }

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

    voltar() {
        this.route.navigate(["/produto-pagina"]);
        this.modalCtrl.dismiss();
    }
}
