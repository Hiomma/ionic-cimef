import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loading: any;

    constructor(private loadingController: LoadingController) { }

    async show() {
        this.loading = await this.loadingController.create({
            message: 'Carregando...'
        });
        await this.loading.present();
    }

    async dismiss() {
        this.loadingController.dismiss();
    }
}
