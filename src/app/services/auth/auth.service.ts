import { Injectable } from '@angular/core';
import { GraphQlService } from '../graphql/graph-ql.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private graphql: GraphQlService,
        private storage: StorageService) { }

    autenticar(usuario) {
        return new Promise((resolve, reject) => {
            this.graphql.post("api/login", usuario, true).then(data => {
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
        let data1Dias = new Date().setDate(dataHoje.getDate() + 1);

        let setting = {
            authenticated: true,
            dtultlogin: dataHoje,
            dtexpires: data1Dias,
            id: ssn.id,
            token: ssn.token
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
