import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';


import { TeacherService } from '../teacher.service';
import { LearningArea } from './../../global/models/classes';
import { LearningAreaDialogComponent } from './../forms/learning-area-forms.component';


@Component({
  selector: 'app-learning-area-list',
  templateUrl: './learning-area-list.component.html',
  styleUrls: ['./learning-area-list.component.css']
})
export class LearningAreaListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningAreaDialogComponent>;

  items: Observable<LearningArea[]>;

  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.ts.findList('learningArea').map(value => {
      return value.map(c => (LearningArea.fromJson(c.payload.key, {...c.payload.val()})));
    });
  }

  add(item?: LearningArea) {
    this.DialogRef = this.dialog.open(LearningAreaDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningArea/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningArea(x.data.value), 'Area Added');
        }
      });
  }

  delete(item: LearningArea) {
    this.messagefromPromise(this.ts.changeObject(`/learningArea/${item.key}`), 'Learning Area Deleted')
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

