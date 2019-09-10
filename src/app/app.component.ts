import { Component } from '@angular/core';
import { Country } from './models/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CountryFinder';

  public selectedCountry: Country;

  onCountrySelected(country) {
    this.selectedCountry = country;
  }
}
