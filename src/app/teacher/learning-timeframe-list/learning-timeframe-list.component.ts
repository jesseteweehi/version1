import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';


import { TeacherService } from './../models/teacher.service';
import { LearningTimeframe } from './../../global/models/classes';
import { LearningTimeframeDialogComponent } from './../forms/learning-timeframe-forms.component';
import { errorHandler } from '@angular/platform-browser/src/browser';



@Component({
  selector: 'app-learning-timeframe-list',
  templateUrl: './learning-timeframe-list.component.html',
  styleUrls: ['./learning-timeframe-list.component.css']
})
export class LearningTimeframeListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningTimeframeDialogComponent>;

  items: Observable<LearningTimeframe[]>;

  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.ts.findList('learningTimeframe').map(value => {
      return value.map(c => (LearningTimeframe.fromJson(c.payload.key, {...c.payload.val()})));
    });
  }

  add(item?: LearningTimeframe) {
    this.DialogRef = this.dialog.open(LearningTimeframeDialogComponent, {
      data: {
        'currentFormValues': item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningTimeframe/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.CreateLearningTimeFrame(x.data.value), 'Timeframe Added');
        }
      });
  }

  delete(item: LearningTimeframe) {
    this.messagefromPromise(this.ts.changeObject(`/learningTimeframe/${item.key}`), 'Timeframe Deleted')
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



