import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLookupComponent } from './country-lookup.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from 'src/app/services/country.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';

describe('CountryLookupComponent', () => {
  let component: CountryLookupComponent;
  let fixture: ComponentFixture<CountryLookupComponent>;
  let mockCountryService: jasmine.Spy;
  let mockSearchHistoryService: jasmine.Spy;

  beforeEach(async(() => {
    mockCountryService = jasmine.createSpy('CountryService');
    mockSearchHistoryService = jasmine.createSpy('SearchHistoryService');

    TestBed.configureTestingModule({
      declarations: [CountryLookupComponent],
      imports: [FormsModule, NgbTypeaheadModule],
      providers: [
        { provide: 'COUNTRY_BASE_URL', useValue: 'http://testbase' },
        { provide: CountryService, useClass: mockCountryService },
        { provide: SearchHistoryService, useValue: mockSearchHistoryService}
      ]
    })
      .compileComponents();
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
});
