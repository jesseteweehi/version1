import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { SchoolCourse } from './../../global/models/classes';
import { SchoolCourseDialogComponent } from '../forms/school-course-forms.component';
import { TeacherService } from '../teacher.service';

import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-school-course-list',
  templateUrl: './school-course-list.component.html',
  styleUrls: ['./school-course-list.component.css']
})
export class SchoolCourseListComponent implements OnInit {
  DialogRef: MatDialogRef<SchoolCourseDialogComponent>;

  items: Observable<SchoolCourse[]>

  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.ts.findList('schoolCourse').map(value => {
      return value.map(c => (SchoolCourse.fromJson(c.payload.key, {...c.payload.val()})));
    });
  }


  add(item?: SchoolCourse) {
    this.DialogRef = this.dialog.open(SchoolCourseDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/schoolCourse/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createSchoolCourse(x.data.value), 'School Course Added');
        }
      });
  }

  delete(item: SchoolCourse) {
    this.messagefromPromise(this.ts.changeObject(`/SchoolCourse/${item.key}`), 'School Course Deleted');
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
