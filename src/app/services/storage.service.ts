import { Injectable } from '@angular/core';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


@Injectable({providedIn: 'root'})
export class StorageService {
    constructor() { }

    getItem<T>(storageKey: string): T {
        return JSON.parse(localStorage.getItem(storageKey)) as T;
    }

    setItem(storageKey: string, item: any) {
        localStorage.setItem(storageKey, JSON.stringify(item));
    }
}
