import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Student } from './../../global/models/classes';
import { StudentDialogComponent } from './../forms/student-forms.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();

  DialogRef: MatDialogRef<StudentDialogComponent>;

  items: Student[];
  filtered: Student[];

  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    const items = this.ts.findList('studentProfile')
      .takeUntil(this.ngUnsubscribe)
      .map(value => {
      return value.map(c => (Student.fromJson(c.payload.key, {...c.payload.val()})));
    });

    items.subscribe(result => {
      this.items = result;
      this.filtered = this.items;
      });
  }

  search(s: string) {
    this.filtered = this.items.filter(j => j.lastName.toLowerCase().includes(s));
  }

  add(item?: Student) {
    this.DialogRef = this.dialog.open(StudentDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/student/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningGroup(x.data.value), 'Student Added');
        }
      });
  }

  delete(item: Student) {
    this.messagefromPromise(this.ts.changeObject(`/students/${item.key}`), 'Student Deleted');
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}