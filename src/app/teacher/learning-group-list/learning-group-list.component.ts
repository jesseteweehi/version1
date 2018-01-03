import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningGroup, LearningArea } from './../../global/models/classes';
import { LearningGroupDialogComponent } from './../forms/learning-group-forms.component';
import { TeacherService } from '../teacher.service';

import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-learning-group-list',
  templateUrl: './learning-group-list.component.html',
  styleUrls: ['./learning-group-list.component.css']
})
export class LearningGroupListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningGroupDialogComponent>;

  learningGroupItems: LearningGroup[];
  learningAreaItems: object;




  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    const learningGroup$ = this.ts.findList('learningGroup')
                            .map(outer => outer.map(c => LearningGroup.fromJson(c.payload.key, {...c.payload.val()} )) );
    const learningAreas$ = this.ts.findObjectPath('learningArea').map(c => c.payload.val());
    // Observable.combineLatest(learningGroup$, learningAreas$).subscribe(event => console.log(event[0]));
    Observable.combineLatest(learningGroup$, learningAreas$).subscribe(result => {
       this.learningGroupItems = result[0];
       this.learningAreaItems = result[1];
    });
  }


  add(item?: LearningGroup) {
    this.DialogRef = this.dialog.open(LearningGroupDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningGroup/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningGroup(x.data.value), 'Learning Group Added');
        }
      });
  }

  delete(item: LearningGroup) {
    this.messagefromPromise(this.ts.changeObject(`/learningGroup/${item.key}`), 'Learning Group Deleted');
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
