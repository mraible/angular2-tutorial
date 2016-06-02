import { Component } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, RouteSegment } from '@angular/router';
import { Person, SearchService } from '../shared/index';

@Component({
  selector: 'sd-search',
  moduleId: module.id,
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class SearchComponent {
  loading: boolean;
  query: string;
  searchResults: Array<Person>;

  constructor(public searchService: SearchService, routeSegment: RouteSegment) {
    if (routeSegment.getParam('term')) {
      this.query = decodeURIComponent(routeSegment.getParam('term'));
      this.search();
    }
  }

  search(): void {
    this.searchService.search(this.query).subscribe(
      data => {this.searchResults = data;},
      error => console.log(error)
    );
  }
}
