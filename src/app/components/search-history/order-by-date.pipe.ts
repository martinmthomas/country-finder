import { PipeTransform, Pipe } from '@angular/core';
import { SearchHistoryItem } from 'src/app/models/searchHistoryItem';

@Pipe({ name: 'orderByDate', pure: false })
export class OrderByDatePipe implements PipeTransform {
    transform(items: SearchHistoryItem<any>[]) {
        return items.sort((a, b) => b.lastAccessed.diff(a.lastAccessed));
    }
}
