import { Currency } from './currency';

export class Country {
    name: string;
    alpha3Code: string;
    flag: string;
    currencies: Currency[];
    latlng: number[];
    area: number;
}
