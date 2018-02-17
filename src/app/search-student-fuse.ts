import { Component, OnInit } from '@angular/core';
import * as fuse from 'fuse.js';
import { TeacherService } from './teacher/teacher.service';
import { Student } from './global/models/classes';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-fuse-search',
    template: `
    <mat-input-container class="full-width" floatPlaceholder="auto" *ngIf="searchObject">
    <input matInput
            type="text"
            placeholder="Search"
            [formControl]="term">
</mat-input-container>
<mat-list dense>
    <mat-list-item *ngFor="let item of hits" on-click="go(item.key)">
        {{item.firstName}} {{item.lastName}}
    </mat-list-item>
</mat-list>
    `,
    styles: [`
    mat-list-item:hover {
        background-color: whitesmoke;
    }
    `]
})

export class StudentFuseSearchComponent implements OnInit {
    term = new FormControl();
    searchObject: any;

    hits: Student[];


    constructor(private as: AppService,
                private router: Router) { }

    ngOnInit() {

    const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'firstName',
      'lastName'
      ]
    };

    const items = this.as.findList('studentProfile')
        // .takeUntil(this.ngUnsubscribe)
        .map(value => {
      return value.map(c => (Student.fromJson(c.payload.key, {...c.payload.val()})));
      });

    items.subscribe(result => {
        this.searchObject = new fuse(result, options);
      });

    this.term.valueChanges
                    .debounceTime(400)
                    .distinctUntilChanged()
                    .subscribe(result => {
                        console.log(result);
                        this.hits = this.searchObject.search(result);
                    });

    }

    go(s: string) {
        this.router.navigate(['teacher/student-list', s]);
    }
}
