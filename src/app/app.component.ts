import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {


    public appPages = [
        {
            title: 'Notícias',
            url: '/home',
            icon: 'ios-paper'
        },
        {
            title: 'Categorias',
            url: '/categoria',
            icon: 'ios-filing'
        },
        {
            title: 'Posições',
            url: '/posicao',
            icon: 'ios-expand'
        },
        {
            title: 'Slides',
            url: '/slide',
            icon: 'ios-expand'
        },
        {
            title: "Sair",
            url: "/login",
            icon: "log-out"
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private storage: StorageService,
        private auth: AuthService,
        private menuController: MenuController
    ) {
        this.initializeApp();

        this.menuController.enable(false);

        this.storage.loadSetting("session").then(data => {
            if (data) {

                if (window.location.href.indexOf("login") == -1) {
                    if (data.dtexpires < new Date().getTime()) {
                        this.router.navigate(["login"]);
                        this.storage.eraseData();

                        this.menuController.enable(false)
                    } else {
                        if (window.location.href.indexOf("categoria") != -1 || window.location.href.indexOf("home") != -1 || window.location.href.indexOf("posicao") != -1 || window.location.href.indexOf("slide") != -1) {
                            this.menuController.enable(true);
                        } else {
                            this.menuController.enable(false);
                        }
                    }
                } else {
                    this.storage.eraseData();
                    this.menuController.enable(false)
                }
            } else {
                if (window.location.href.indexOf("categoria") != -1 || window.location.href.indexOf("home") != -1 || window.location.href.indexOf("posicao") != -1 || window.location.href.indexOf("slide") != -1) {
                    this.router.navigate(["login"]);
                    this.storage.eraseData();
                    this.menuController.enable(false)
                }
            }
        })
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    irPagina(url) {
        if (url == "/login") {
            this.auth.destruirUsuario();
            this.menuController.enable(false);
        }

        this.router.navigate([url]);
    }
}
