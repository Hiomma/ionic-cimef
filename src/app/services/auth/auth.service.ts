import { Injectable } from '@angular/core';
import { GraphQlService } from '../graphql/graph-ql.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private api: GraphQlService,
        private storage: StorageService) { }

    autenticar(usuario) {
        return new Promise((resolve, reject) => {
            this.api.post("login", usuario, true).then(data => {
                if (data) {
                    this.guardarUsuario(data);
                    resolve(data);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }

    guardarUsuario(ssn) {
        let dataHoje = new Date();
        let data2Dias = new Date().setDate(dataHoje.getDate() + 2);

        let setting = {
            authenticated: true,
            dtultlogin: dataHoje,
            dtexpires: data2Dias,
            id: ssn.data.id,
            token: ssn.data.token
        }

        this.storage.saveSetting('session', setting);
    }

    carregarUsuario() {
        return new Promise(resolve => {
            this.storage
                .loadSetting("session")
                .then(ssn => {
                    resolve(ssn);
                });
        });
    }

    destruirUsuario() {
        return new Promise(resolve => {
            this.storage.eraseData();
            resolve(true);
        });
    }
}
