import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of, merge, zip } from 'rxjs';
import { distinctUntilChanged, map, take, toArray, switchMap, catchError, tap, mergeMap, filter, distinct } from 'rxjs/operators';
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
      distinct(),
      map(countries => countries.slice(0, 10)),
    )

  getCountries(text: string): Observable<Country[]> {
    if (text.length < 3) {
      return of([]);
    } else {
      const countriesByName = this.countryService.getCountriesByName(text)
        .pipe(catchError(err => of([])));
      return countriesByName;
      // const countriesByCode = this.countryService.getCountriesByCode(text)
      //   .pipe(catchError(err => of([])));
      // return zip(countriesByName, countriesByCode)
      //   .pipe(map(cs => cs[0].concat(cs[1])));
    }
  }

  onCountrySelected(event) {
    this.searchHistoryService.addSearchedCountry(event.item);
    this.countrySelected.emit(event.item);
  }
}
