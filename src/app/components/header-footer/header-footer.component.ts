import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-footer',
    templateUrl: './header-footer.component.html',
    styleUrls: ['./header-footer.component.scss'],
})
export class HeaderFooterComponent implements OnInit {

    width = self.innerWidth;

    constructor(private router: Router) { }

    ngOnInit() { }

    abrirPagina(rota) {
        this.router.navigate([rota])
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

}
