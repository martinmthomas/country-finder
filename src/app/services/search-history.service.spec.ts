import { StorageService } from './storage.service';
import { SearchHistoryService } from './search-history.service';
import { Country } from '../models/country';

describe('SearchHistoryService', () => {
    let storageServiceSpy: jasmine.SpyObj<StorageService>;
    let searchHistoryService: SearchHistoryService;

    beforeEach(() => {
        storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
        storageServiceSpy.getItem.and.returnValue([
            { name: 'Austria', lastAccessed: new Date() },
            { name: 'Australia', lastAccessed: new Date() },
            { name: 'New Zealand', lastAccessed: new Date() }
        ]);

        searchHistoryService = new SearchHistoryService(storageServiceSpy);
    });

    it('adds country to search history', () => {
        storageServiceSpy.setItem.and.callFake((a, b) => { });

        searchHistoryService.addSearchedCountry({ name: 'Australia', alpha3Code: 'AUS' } as Country);

        expect(searchHistoryService.searchedCountries.length).toBe(3);
        expect(searchHistoryService.searchedCountries[0].name).toBe('Austria');
        expect(searchHistoryService.searchedCountries[1].name).toBe('New Zealand');
        expect(searchHistoryService.searchedCountries[2].name).toBe('Australia');
        // note that Australia is now the third one as the old one has been deleted
    });
});
