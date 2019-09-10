import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CountryLookupComponent } from './components/country-lookup/country-lookup.component';
import { environment } from 'src/environments/environment';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { OrderByDatePipe } from './components/search-history/order-by-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountryLookupComponent,
    CountryInfoComponent,
    SearchHistoryComponent,
    OrderByDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbTypeaheadModule
  ],
  providers: [{ provide: 'COUNTRY_BASE_URL', useValue: environment.countryBaseUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
