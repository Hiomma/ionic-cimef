import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { environment } from "../../../environments/environment";
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GraphQlService {

    private options: any = { headers: null };

    constructor(private storage: StorageService, private http: HttpClient,
        private alertCtrl: AlertController, ) { }

    graphql(query) {
        return new Promise((resolve, reject) => {
            this.storage.loadSetting('session')
                .then(res => {
                    if (res != undefined) {
                        this.options.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + res.token });
                    }

                    return this.http.post(environment.url + "graphql", query, this.options)
                        .subscribe(
                            (res: any) => {
                                if (res.errors && res.errors.length > 0) {
                                    let error = { error: { message: res.errors[0].message } };
                                    this.mensagemErro(error);
                                    reject(res);
                                } else {
                                    resolve(res)
                                }
                            },
                            (error: any) => {
                                this.mensagemErro(error)
                                reject(error);
                            });
                });
        });
    }

    post(endpoint, body, login = false) {
        return new Promise((resolve, reject) => {
            this.storage.loadSetting('session')
                .then(res => {
                    if (res != undefined && login == false) {
                        this.options.headers = new Headers();
                        this.options.headers.append('Authorization', 'Bearer ' + res.token);
                    }

                    return this.http.post(environment.url + endpoint, body, this.options)
                        .subscribe(
                            (res: any) => {
                                resolve(res)
                            },
                            (error: any) => {
                                this.mensagemErro(error)
                                reject(error);
                            });
                });
        });
    }

    private async mensagemErro(error) {
        let message = "";

        if (error.statusText != "Unknown Error") {
            message = error.error.message;
        } else {
            message = 'Você possivelmente está desconectado! Conecte-se em uma rede para efetuar a ação.'
        }
        const alert = await this.alertCtrl.create({
            header: 'Erro!',
            message: message,
            buttons: ['OK']
        });
        return await alert.present();
    }
}
