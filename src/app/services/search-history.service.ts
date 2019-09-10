import { StorageService } from './storage.service';
import { Country } from '../models/country';
import { SearchHistoryItem } from '../models/searchHistoryItem';
import { Injectable } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';
import * as moment from 'moment';


@Injectable({ providedIn: 'root' })
export class SearchHistoryService {

    readonly storageKey = 'SearchHistory';
    searchedCountries: SearchHistoryItem<Country>[];

    constructor(private storageService: StorageService) {
        this.loadSearchHistory();
    }

    loadSearchHistory() {
        this.searchedCountries = this.storageService.getItem<SearchHistoryItem<Country>[]>(this.storageKey);
        if (isNullOrUndefined(this.searchedCountries)) {
            this.searchedCountries = new Array<SearchHistoryItem<Country>>();
        } else {
            this.searchedCountries.forEach(c => c.lastAccessed = moment(c.lastAccessed));
        }
    }

    addSearchedCountry(country: Country) {
        const item = new SearchHistoryItem<Country>();
        item.name = country.name;
        item.lastAccessed = moment();
        item.details = country;

        const ind = this.searchedCountries.findIndex(s => s.name === country.name);
        if (ind > -1) {
            this.searchedCountries.splice(ind, 1);
        }

        this.searchedCountries.push(item);
        this.storageService.setItem(this.storageKey, this.searchedCountries);
    }
}
