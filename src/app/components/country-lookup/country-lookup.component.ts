import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { distinctUntilChanged, catchError, mergeMap, map } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country';
import { SearchHistoryService } from 'src/app/services/search-history.service';

@Component({
  selector: 'app-country-lookup',
  templateUrl: './country-lookup.component.html',
  styleUrls: ['./country-lookup.component.scss']
})
export class CountryLookupComponent implements OnInit, OnChanges {

  public country: string;

  @Output() countrySelected: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(private countryService: CountryService,
              private searchHistoryService: SearchHistoryService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  inputFormatter = (c: Country) => `${c.name}`;

  resultFormatter = (c: Country) => `${c.name} - ${c.alpha3Code}`;

  searchCountry = (text: Observable<string>) =>
    text.pipe(
      distinctUntilChanged(),
      mergeMap(t => this.getCountries(t)),
      map(countries => this.distinctCountries(countries)),
      map(distCountries => distCountries.slice(0, 10))
    )


  distinctCountries(countries: Country[]) {
    const result = new Array<Country>();

    for (const country of countries) {
      let added = false;

      for (const addedCountry of result) {
        if (addedCountry.name === country.name) {
          added = true;
          break;
        }
      }

      if (!added) {
        result.push(country);
      }
    }
    return result;
  }

  getCountries(text: string): Observable<Country[]> {
    if (text.length < 3) {
      return of([]);
    } else {
      const countriesByName = this.countryService.getCountriesByName(text)
        .pipe(catchError(err => {
          console.log(err);
          return of([]);
        }));

      const countriesByCode = this.countryService.getCountriesByCode(text)
        .pipe(catchError(err => {
          console.log(err);
          return of([]);
        }));

      return zip(countriesByName, countriesByCode)
        .pipe(map(cs => cs[0].concat(cs[1])));
    }
  }

  onCountrySelected(event) {
    this.searchHistoryService.addSearchedCountry(event.item);
    this.countrySelected.emit(event.item);
  }
}
