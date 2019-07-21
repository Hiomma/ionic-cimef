import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-header-footer',
    templateUrl: './header-footer.component.html',
    styleUrls: ['./header-footer.component.scss'],
})
export class HeaderFooterComponent implements OnInit {

    width = self.innerWidth;
    teste;

    constructor(private router: Router,
        private menuController: MenuController) { }

    ngOnInit() { }

    async abrirMenu() {
        this.menuController.enable(true, 'celular');
        await this.menuController.open("celular")
    }

    abrirPagina(rota) {
        this.router.navigate([rota])
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

}
