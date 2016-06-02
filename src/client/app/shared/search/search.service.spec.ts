import {it, describe, expect, inject, fakeAsync, beforeEachProviders, tick} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions} from 'angular2/http';

import {SearchService} from './search.service';

export function main() {
  describe('Search Service', () => {
    beforeEachProviders(() => {
      return [BaseRequestOptions, MockBackend, SearchService,
        provide(Http, {
          useFactory: (backend:ConnectionBackend, defaultOptions:BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        }),
      ];
    });

    it('should retrieve all search results',
      inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
        var res:Response;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('shared/data/people.json');
          let response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
          c.mockRespond(new Response(response));
        });
        searchService.getAll().subscribe((response) => {
          res = response;
        });
        tick();
        expect(res[0].name).toBe('John Elway');
      }))
    );

    it('should filter by search term',
      inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
        var res:Response;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('shared/data/people.json');
          let response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
          c.mockRespond(new Response(response));
        });
        searchService.search('john').subscribe((response) => {
          res = response;
        });
        tick();
        expect(res[0].name).toBe('John Elway');
      }))
    );

    it('should fetch by id',
      inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
        var res:Response;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('shared/data/people.json');
          let response = new ResponseOptions({body: '[{"id": 1, "name": "John Elway"}, {"id": 2, "name": "Gary Kubiak"}]'});
          c.mockRespond(new Response(response));
        });
        searchService.search('2').subscribe((response) => {
          res = response;
        });
        tick();
        expect(res[0].name).toBe('Gary Kubiak');
      }))
    );
  });
}

