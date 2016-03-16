import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Person, SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'sd-search',
  moduleId: module.id,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class SearchComponent {
  loading: boolean;
  query: string;
  searchResults: Array<Person>;

  constructor(public searchService: SearchService, params: RouteParams) {
    if (params.get('term')) {
      this.query = decodeURIComponent(params.get('term'));
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
