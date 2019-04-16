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

        this.storage.loadSetting("session").then(data => {
            if (data) {
                if (window.location.href.indexOf("login") == -1) {
                    if (data.dtexpires < new Date().getTime()) {
                        this.router.navigate(["login"]);
                        this.storage.eraseData();

                        this.menuController.enable(false)
                    } else {
                        this.menuController.enable(true)
                    }
                } else {
                    this.storage.eraseData();
                    this.menuController.enable(false)
                }
            } else {
                this.router.navigate(["login"]);
                this.storage.eraseData();
                this.menuController.enable(false)
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
