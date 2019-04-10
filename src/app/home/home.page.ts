import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    texto: string = "";
    manchete: string = "";
    titulo: string = "";
    categoria: any;
    posicao: any;

    public Editor = ClassicEditor;
    @ViewChild("slideAdd") slideAdd: IonSlides;

    constructor() { }

    ngOnInit() {
        this.slideAdd.slideNext();
        this.slideAdd.lockSwipes(true);
    }

    proximo() {
        this.slideAdd.lockSwipes(false);
        this.slideAdd.slideNext();
        this.slideAdd.lockSwipes(true);
    }

    voltar() {
        this.slideAdd.lockSwipes(false);
        this.slideAdd.slidePrev();
        this.slideAdd.lockSwipes(true);
    }
}
