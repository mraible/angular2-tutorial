import {
  it,
  describe,
  expect,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';

import {MockRouterProvider} from '../../shared/services/mocks/routes';
import {MockSearchService} from '../../shared/services/mocks/search.service';

import {SearchComponent} from './search.component';

export function main() {
  describe('Search component', () => {
    var mockSearchService:MockSearchService;
    var mockRouterProvider:MockRouterProvider;

    beforeEachProviders(() => {
      mockSearchService = new MockSearchService();
      mockRouterProvider = new MockRouterProvider();

      return [
        mockSearchService.getProviders(), mockRouterProvider.getProviders()
      ];
    });

    it('should search when a term is set and search() is called', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      return tcb.createAsync(SearchComponent).then((fixture) => {
        let searchComponent = fixture.debugElement.componentInstance;
        searchComponent.query = 'M';
        searchComponent.search();
        expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
      });
    }));

    it('should search automatically when a term is on the URL', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      mockRouterProvider.setRouteParam('term', 'peyton');
      return tcb.createAsync(SearchComponent).then((fixture) => {
        fixture.detectChanges();
        expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
      });
    }));
  });
}
