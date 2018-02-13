import { Component, Injectable, OnInit, AfterViewInit } from '@angular/core';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { environment } from './../../environments/environment';

import instantsearch from 'instantsearch.js/es';
import { connectHits } from 'instantsearch.js/es/connectors';


@Injectable()
export class InstantSearchService {
  search = instantsearch(environment.algolia)
  constructor() {}
}

@Component({
    selector: 'app-hits',
    template: ` <div class="is-hits-root">
    <mat-card *ngFor="let hit of state.hits">
        <mat-card-header>
            <mat-card-title>{{hit.firstName}} {{hit.lastName}} {{hit.objectID}}</mat-card-title>
            <mat-card-subtitle>{{hit.yrLvl}} {{hit.gender}}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions align="start">
            <a [routerLink]="['../student-list', hit.objectID]" mat-button>Learning</a>
        </mat-card-actions>
    </mat-card>
    `,
    styles: []
  })
export class HitsComponent implements OnInit {
    // Define how your component state will look like,
    // and intialize it with an empty hits array
  state: { hits: {}[] } = { hits: [] };

  constructor(private instantSearchService: InstantSearchService) {}

  ngOnInit() {
      // Create a widget which will call `this.updateState` whenever
      // something changes on the search state itself
    const widget = connectHits(this.updateState);

      // Register the Hits widget into the instantSearchService search instance.
    this.instantSearchService.search.addWidget(widget());
  }

  updateState = (state, isFirstRendering) => {
      // asynchronous update of the state
      // avoid `ExpressionChangedAfterItHasBeenCheckedError`
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this.state = state;
      });
    }
    this.state = state;
  }
}

@Component({
  selector: 'app-search-box',
  template: `
  <mat-input-container floatPlaceholder="auto">
      <input matInput
             type="text"
             [value]="state.query"
             (input)="handleChange($event.target.value)"
             placeholder="Search">
  </mat-input-container>
  <img src="https://www.algolia.com/static_assets/images/pricing/pricing_new/algolia-powered-by-14773f38.svg" alt="Algolia">
  `,
  styles: []
})
export class SearchBoxComponent implements OnInit {
  // Define SearchBox initial state
  state: { query: string; refine: Function } = {
    query: '',
    refine() {}
  };

  constructor(private instantSearchService: InstantSearchService) {}

  ngOnInit() {
    const widget = connectSearchBox(this.updateState);
    this.instantSearchService.search.addWidget(widget());
  }

  updateState = (state, isFirstRendering) => {
    // asynchronous update of the state
    // avoid `ExpressionChangedAfterItHasBeenCheckedError`
    if (isFirstRendering) {
      return Promise.resolve(null).then(() => {
        this.state = state;
      });
    }

    this.state = state;
  }

  handleChange(query) {
    this.state.refine(query)
  }
}

@Component({
    selector: 'app-student-search',
    template: `
    <app-search-box></app-search-box>
    <app-hits></app-hits>
    `
})

export class StudentSearchComponent implements AfterViewInit {
    title = 'app';

    constructor(private instantSearchService: InstantSearchService) {}

    ngAfterViewInit() {
      this.instantSearchService.search.start();
    }

   

}