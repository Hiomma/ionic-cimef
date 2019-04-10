import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private SETTINGS_KEY: string = '_settings';
    private DATA_KEY: string = '_offData';

    constructor(public storage: Storage) {

    }

    saveCachedData(key: string, chv: any) {
        this.storage.set(this.DATA_KEY + '.' + key, chv);
    }

    loadCachedData(key: string) {
        return this.storage
            .get(this.DATA_KEY + '.' + key)
            .then((data) => {
                return (data != undefined && data.value != undefined ? data.value : data);
            });
    }

    saveSetting(key: string, chv: any) {
        this.storage.set(this.SETTINGS_KEY + '.' + key, chv);
    }

    loadSetting(key: string) {
        return this.storage.get(this.SETTINGS_KEY + '.' + key).then((value) => {
            return value;
        });
    }

    eraseData() {
        this.storage.clear();
    }
}
