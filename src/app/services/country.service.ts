import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';


@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor(
        @Inject('COUNTRY_BASE_URL')
        private countryBaseUrl: string,
        private http: HttpClient) { }

    getCountriesByName(name: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.countryBaseUrl}/name/${name}`);
    }

    getCountriesByCode(code: string): Observable<Country[]> {
        return this.http.get<Country[]>(`${this.countryBaseUrl}/alpha/${code}`);
    }
}
