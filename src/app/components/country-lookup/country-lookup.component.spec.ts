import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLookupComponent } from './country-lookup.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from 'src/app/services/country.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { Country } from 'src/app/models/country';

import { Observable, of, zip } from 'rxjs';


describe('CountryLookupComponent', () => {
  let component: CountryLookupComponent;
  let fixture: ComponentFixture<CountryLookupComponent>;
  let mockCountrySpy: jasmine.SpyObj<CountryService>;
  let mockSearchHistorySpy: jasmine.SpyObj<SearchHistoryService>;

  beforeEach(async(() => {
    const mockCountryService = jasmine.createSpyObj('CountryService', ['getCountriesByName', 'getCountriesByCode']);
    const mockSearchHistoryService = jasmine.createSpyObj('SearchHistoryService', ['addSearchedCountry']);

    TestBed.configureTestingModule({
      declarations: [CountryLookupComponent],
      imports: [FormsModule, NgbTypeaheadModule],
      providers: [
        { provide: 'COUNTRY_BASE_URL', useValue: 'http://testbase' },
        { provide: CountryService, useValue: mockCountryService },
        { provide: SearchHistoryService, useValue: mockSearchHistoryService }
      ]
    })
      .compileComponents();

    mockCountrySpy = TestBed.get(CountryService);
    mockSearchHistorySpy = TestBed.get(SearchHistoryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input shows just country name', () => {
    const inputDisp = component.inputFormatter({
      name: 'Australia',
      alpha3Code: 'AUS'
    } as any);

    expect(inputDisp).toBe('Australia');
  });

  it('typeahead list shows both country name and code', () => {
    const resultDisp = component.resultFormatter({
      name: 'Australia',
      alpha3Code: 'AUS'
    } as any);

    expect(resultDisp).toBe('Australia - AUS');
  });

  it('distinctCountries returns unique countries based on their name', () => {
    const countries = [
      { name: 'Australia', alpha3Code: 'AUS' },
      { name: 'Austria', alpha3Code: 'AUT' },
      { name: 'Australia', alpha3Code: 'AUS' }
    ] as Country[];

    const result = component.distinctCountries(countries);

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Australia');
    expect(result[1].name).toBe('Austria');
  });

  it('getCountries returns empty when input lenght is less than 3', () => {
    const countries = component.getCountries('au');

    countries.subscribe(cs => expect(cs).toBeUndefined);
  });

  it('getCountries checks for data using both name and code', () => {
    mockCountrySpy.getCountriesByName.and
      .returnValue(of([
        { name: 'Australia', alpha3Code: 'AUS' },
        { name: 'Austria', alpha3Code: 'AUT' }
      ]));

    mockCountrySpy.getCountriesByCode.and
      .returnValue(of([
        { name: 'Australia', alpha3Code: 'AUS' }
      ]));

    const countries = component.getCountries('aus');

    countries.subscribe(cs => {
      expect(cs.length).toBe(3);
    });
  });

  it('onCountrySelected adds item to search history', () => {
    mockSearchHistorySpy.addSearchedCountry.and.callFake(() => { });

    component.onCountrySelected({
      item: { name: 'Australia', alpha3Code: 'AUS' }
    });
    expect(mockSearchHistorySpy.addSearchedCountry).toHaveBeenCalledTimes(1);
    expect(mockSearchHistorySpy.addSearchedCountry).toHaveBeenCalledWith({ name: 'Australia', alpha3Code: 'AUS' });
  });

});
