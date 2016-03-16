import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../../home/components/home.component';
import {AboutComponent} from '../../about/components/about.component';
import {SearchComponent} from '../../search/components/search.component';
import {EditComponent} from '../../search/components/edit.component';
import {NameListService} from '../../shared/services/name-list.service';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService, SearchService],
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@RouteConfig([
  { path: '/',      name: 'Home',  component: HomeComponent  },
  { path: '/about', name: 'About', component: AboutComponent },
  { path: '/search', name: 'Search', component: SearchComponent },
  { path: '/edit/:id', name: 'Edit', component: EditComponent }
])
export class AppComponent {}
