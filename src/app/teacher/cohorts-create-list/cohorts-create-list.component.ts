import { Cohort } from './../../global/models/classes';
import { CohortDialogComponent } from './../forms/cohorts-form.component';
import { Component, OnInit } from '@angular/core';
import * as fuse from 'fuse.js';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';


import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';
import { Student } from '../../global/models/classes';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-cohorts-create-list',
  templateUrl: './cohorts-create-list.component.html',
  styleUrls: ['./cohorts-create-list.component.css']
})
export class CohortsCreateListComponent implements OnInit {
  DialogRef: MatDialogRef<CohortDialogComponent>;

  term = new FormControl();
  searchObject: any;

  hits: Student[];
  selecteditems: Student[];

  constructor(private ts: TeacherService,
              private router: Router,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

  const options = {
  shouldSort: true,
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'firstName',
    'lastName'
    ]
  };

  const items = this.ts.findList('studentProfile')
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

  add(students: any) {
    console.log(students);
    this.DialogRef = this.dialog.open(CohortDialogComponent, {
      data: {
        currentFormValues: null
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        const studentsList = students.selectedOptions.selected.map(item => item.value);
        this.messagefromPromise(this.ts.saveCohortData(x.data.value, studentsList), 'Cohort Created')
        });
  }

  messagefromPromise(data: Promise<any>, success = 'Success', error = 'Bugger') {
    data
      .then(_ => this.openSnackBar(success, 'Awesome'))
      .catch(err => this.openSnackBar(`error`, 'Bugger'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
