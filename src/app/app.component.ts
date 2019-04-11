import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
