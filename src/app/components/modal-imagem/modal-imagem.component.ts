import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-modal-imagem',
    templateUrl: './modal-imagem.component.html',
    styleUrls: ['./modal-imagem.component.scss'],
})
export class ModalImagemComponent implements OnInit {

    @Input() noticia: any;
    listImagens: Array<any> = new Array();

    constructor() { }

    ngOnInit() {
        this.listImagens = JSON.parse(JSON.stringify(this.noticia.imagens));
        this.listImagens.forEach(element => element.url = environment.url + element.url)
    }

}
