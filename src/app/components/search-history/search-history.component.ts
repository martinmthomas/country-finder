import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { OrderByDatePipe } from './order-by-date.pipe';
import { SearchHistoryItem } from 'src/app/models/searchHistoryItem';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {

  @Output() itemSelected: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(public searchHistoryService: SearchHistoryService) { }

  ngOnInit() {
  }

  onItemSelected(item: SearchHistoryItem<Country>) {
    this.itemSelected.emit(item.details);
  }
}
