import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Student } from './../../global/models/classes';
import { StudentDialogComponent } from './../forms/student-forms.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  DialogRef: MatDialogRef<StudentDialogComponent>;

  items: Observable<Student[]>;




  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.ts.findList('studentProfile').map(value => {
      return value.map(c => (Student.fromJson(c.payload.key, {...c.payload.val()})));
    });
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
}