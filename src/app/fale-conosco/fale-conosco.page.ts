import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-fale-conosco',
    templateUrl: './fale-conosco.page.html',
    styleUrls: ['./fale-conosco.page.scss'],
})
export class FaleConoscoPage implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    abrirPagina(rota) {
        this.router.navigate([rota])
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

}
