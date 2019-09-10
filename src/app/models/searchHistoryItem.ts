import * as moment from 'moment';

export class SearchHistoryItem<T> {
    name: string;
    lastAccessed: moment.Moment;
    details: T;
}
