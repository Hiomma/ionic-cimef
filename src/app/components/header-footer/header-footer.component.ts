import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, PopoverController } from '@ionic/angular';
import { MenuToolbarComponent } from '../menu-toolbar/menu-toolbar.component';

@Component({
    selector: 'app-header-footer',
    templateUrl: './header-footer.component.html',
    styleUrls: ['./header-footer.component.scss'],
})
export class HeaderFooterComponent implements OnInit {

    width = self.innerWidth;
    teste;

    constructor(private router: Router,
        private popoverController: PopoverController,
        private menuController: MenuController) { }

    ngOnInit() { }

    async abrirMenu() {
        this.menuController.enable(true, 'celular');
        await this.menuController.open("celular")
    }

    async abrirPagina(rota, ev?) {
        if (rota == "/produto") {
            const popover = await this.popoverController.create({
                component: MenuToolbarComponent,
                event: ev,
                showBackdrop: false,
                translucent: true,
                cssClass: "popoverToolbar"
            });
            await popover.present();
        } else {
            this.router.navigate([rota])
        }
    }

    abrirUrl(url) {
        window.open(url, "_blank")
    }

}
