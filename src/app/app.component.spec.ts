import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { CountryLookupComponent } from './components/country-lookup/country-lookup.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { OrderByDatePipe } from './components/search-history/order-by-date.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Country } from './models/country';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SearchHistoryComponent, CountryLookupComponent, CountryInfoComponent, OrderByDatePipe
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbTypeaheadModule
      ],
      providers: [{ provide: 'COUNTRY_BASE_URL', useValue: 'http://testbase' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CountryFinder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CountryFinder');
  });

  it('onCountrySelected must set the selectedCountry property so that country-info can display the data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const country = {
      name: 'Australia',
      alpha3Code: 'AUS'
    } as Country;

    app.onCountrySelected(country);

    expect(app.selectedCountry).toBe(country);
  });
});
