import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningMatrixDialogComponent } from './../forms/learning-matrix-forms.component';

import { LearningMatrix } from './../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-learning-matrix-list',
  templateUrl: './learning-matrix-list.component.html',
  styleUrls: ['./learning-matrix-list.component.css']
})
export class LearningMatrixListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningMatrixDialogComponent>;
  items: Observable<LearningMatrix[]>;

  constructor(
              private ts: TeacherService,
              private location: Location,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.ts.findList('learningMatrix').map(changes => changes.map(c => LearningMatrix.fromJson(c.key, {...c.payload.val()})) );
  }

  add(item?: LearningMatrix) {
    this.DialogRef = this.dialog.open(LearningMatrixDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningMatrix/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningMatrix(x.data.value), 'Learning Matrix Added');
        }
      });
  }

  delete(item: LearningMatrix) {
    this.messagefromPromise(this.ts.changeObject(`/learningMatrix/${item.key}`), 'Learning Matrix Deleted');
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
