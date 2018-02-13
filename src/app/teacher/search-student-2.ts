import { Component, OnInit } from '@angular/core';
import * as JsSearch from 'js-search';
import { Student } from '../global/models/classes';
import { TeacherService } from './teacher.service';


@Component({
    selector: 'app-client-search',
    template: `
    <mat-input-container class="full-width" floatPlaceholder="auto">
    <input matInput
            type="text"
            placeholder="Search"
            (keyup)="search(input.value)"
            #input>
</mat-input-container>
    {{ hits | json }}
    `
})

export class StudentClientSearchComponent implements OnInit {
    searchObject: any;

    hits: Student[];

    books = [{
        isbn: '9781597226769',
        title: 'The Great Gatsby',
        author: {
          name: 'F. Scott Fitzgerald'
        },
        tags: ['book', 'inspirational']
      },
      {
        isbn: '0307474275',
        title: 'The DaVinci Code',
        author: {
          name: 'Dan Brown'
        },
        tags: ['book', 'mystery']
      },
      {
        isbn: '074349346X',
        title: 'Angels & Demons',
        author: {
          name: 'Dan Brown',
        },
        tags: ['book', 'mystery']
      }];

    constructor(private ts: TeacherService) { }

    ngOnInit() {
      this.searchObject = new JsSearch.Search('students');
      this.searchObject.searchIndex = new JsSearch.UnorderedSearchIndex();
      this.searchObject.addIndex('firstName');
      this.searchObject.addIndex('lastName');

      const items = this.ts.findList('studentProfile')
        // .takeUntil(this.ngUnsubscribe)
        .map(value => {
      return value.map(c => (Student.fromJson(c.payload.key, {...c.payload.val()})));
      });

      items.subscribe(result => {
        console.log(result);
        this.searchObject.addDocuments(result);
        console.log(this.searchObject);
      });
    }

    search(s: string) {
        console.log(s);
        this.hits = this.searchObject.search(s);
    }



};