import { Component, OnInit, Input } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit {

  @Input() selectedCountry: Country = new Country();

  constructor() { }

  ngOnInit() {
  }
}
