import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    email: string = "";
    password: string = "";

    constructor(private menuController: MenuController,
        private auth: AuthService,
        private loader: LoaderService,
        private router: Router) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    async login() {
        await this.loader.show();
        this.auth.autenticar({ email: this.email, password: this.password }).then(async () => {
            await this.loader.dismiss();
            this.router.navigate(["/home"]);
        }).catch(async () => {
            await this.loader.dismiss();
        })
    }

}
