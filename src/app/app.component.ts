import { Component } from '@angular/core';

import { Platform, MenuController, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { GraphQlService } from './services/graphql/graph-ql.service';
import { QueryService } from './services/query/query.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    celular = [
        {
            title: 'Home',
            url: '/',
            icon: 'ios-bookmarks'
        },
        {
            title: 'Notícias',
            url: '/noticia-pagina',
            icon: 'ios-paper'
        },
        {
            title: 'Empresa',
            url: '/empresa',
            icon: 'ios-briefcase'
        },
        {
            title: 'Produtos',
            url: '/produto',
            icon: 'ios-basket'
        },
        {
            title: 'Assistência Técnica',
            url: '/assistencia-tecnica',
            icon: 'ios-hammer'
        },
        {
            title: 'Depoimentos',
            url: '/depoimentos-pagina',
            icon: 'ios-chatboxes'
        },
        {
            title: 'Videos',
            url: '/videos-pagina',
            icon: 'ios-videocam'
        },
        {
            title: 'Fale Conosco',
            url: '/fale-conosco',
            icon: 'ios-chatboxes'
        },
    ]

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
            icon: 'ios-albums'
        },
        {
            title: 'Categorias do Produto',
            url: '/categoria-produto-crud',
            icon: 'ios-filing'
        },
        {
            title: 'Produtos',
            url: '/produto-crud',
            icon: 'ios-basket'
        },
        {
            title: 'Mensagens',
            url: '/mensagem-crud',
            icon: 'ios-chatboxes'
        },
        {
            title: 'Depoimentos',
            url: '/depoimento-crud',
            icon: 'ios-bookmarks'
        },
        {
            title: 'Videos',
            url: '/video-crud',
            icon: 'ios-videocam'
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
        private graphql: GraphQlService,
        private query: QueryService,
        private auth: AuthService,
        private menuController: MenuController,
        private popoverController: PopoverController
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

        if (self.innerWidth < 1000) {
            let i = 0;
            for (let aux of this.celular) {
                if (aux.url == "/produto") {
                    this.graphql.graphql(this.query.getCategoriasProduto("true")).then((data: any) => {
                        let categorias = data.data.categorias_produto;
                        this.celular.splice(i, 1);

                        for (let aux of categorias) {
                            this.celular.unshift({ title: "Produtos - " + aux.nome, icon: "ios-basket", url: "/produto/" + aux.id })
                        }
                    })
                    break;

                }
                i++;
            }
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    async irPagina(url, ev?) {
        if (url == "/login") {
            this.auth.destruirUsuario();
            this.menuController.enable(false);
        }

        if (url == "/produto") {
            const popover = await this.popoverController.create({
                component: MenuToolbarComponent,
                event: ev,
                showBackdrop: false,
                translucent: true,
                cssClass: "popoverToolbar"
            });
            await popover.present();
        } else {
            this.router.navigate([url]);
        }
    }
}
