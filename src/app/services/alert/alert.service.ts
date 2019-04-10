import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alertController: AlertController) { }

    async alerta(mensagem: string) {
        const alert = await this.alertController.create({
            header: 'Alerta',
            message: mensagem,
            buttons: ['OK']
        });

        await alert.present();
    }

    async erro(mensagem: string) {
        const alert = await this.alertController.create({
            header: 'Erro',
            message: mensagem,
            buttons: ["OK"]
        });

        await alert.present();
    }
}
