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

import {EditComponent} from './edit.component';

export function main() {
  describe('Edit component', () => {
    var mockSearchService:MockSearchService;
    var mockRouterProvider:MockRouterProvider;

    beforeEachProviders(() => {
      mockSearchService = new MockSearchService();
      mockRouterProvider = new MockRouterProvider();

      return [
        mockSearchService.getProviders(), mockRouterProvider.getProviders()
      ];
    });

    it('should fetch a single record', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      mockRouterProvider.setRouteParam('id', '1');
      return tcb.createAsync(EditComponent).then((fixture) => {
        let person = {name: 'Emmanuel Sanders', address: {city: 'Denver'}};
        mockSearchService.setResponse(person);

        fixture.detectChanges();
        // verify service was called
        expect(mockSearchService.getByIdSpy).toHaveBeenCalledWith(1);

        // verify data was set on component when initialized
        let editComponent = fixture.debugElement.componentInstance;
        expect(editComponent.editAddress.city).toBe('Denver');

        // verify HTML renders as expected
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h3')).toHaveText('Emmanuel Sanders');
      });
    }));
  });
}
