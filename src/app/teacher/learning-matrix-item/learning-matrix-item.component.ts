import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningGroup, LearningArea } from './../../global/models/classes';
import { LearningMatrixItemDialogComponent } from './../forms/learning-matrix-item-forms.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-learning-matrix-item',
  templateUrl: './learning-matrix-item.component.html',
  styleUrls: ['./learning-matrix-item.component.css']
})
export class LearningMatrixItemComponent implements OnInit {
  DialogRef: MatDialogRef<LearningMatrixItemDialogComponent>;

  learningGroupItems: LearningGroup[];
  learningAreaItems: object;
  xHeadersList: any[] = [];
  yHeadersList: any[] = [];
  cellsList: any[] = [];



  constructor(private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    // const learningGroup$ = this.ts.findList('learningGroup')
    //                         .map(outer => outer.map(c => LearningGroup.fromJson(c.payload.key, {...c.payload.val()} )) );
    // const learningAreas$ = this.ts.findObjectPath('learningArea').map(c => c.payload.val());
    // // Observable.combineLatest(learningGroup$, learningAreas$).subscribe(event => console.log(event[0]));
    // Observable.combineLatest(learningGroup$, learningAreas$).subscribe(result => {
    //    this.learningGroupItems = result[0];
    //    this.learningAreaItems = result[1];
    // });
  }

  getKeyFromArray(item, a) {
    return a.findIndex(item);
  }

  add(a: any[], item?: any, i?: number) {
    this.DialogRef = this.dialog.open(LearningMatrixItemDialogComponent, {
      data: {
        currentFormValues: item,
        array: a,
        index: i
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
          const index = x.index;
          if (index !== -1) {
            a[index] = x.data.value;
          }
        } else {
          a.push(x.data.value);
        }
      });
  }

  delete(a: any[], i: any) {
    a.splice(i , 1);
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

  template() {
    if (this.xHeadersList) {
      if (this.xHeadersList.length > 1) {
        return { 'grid-template-columns' : 'repeat(' + (this.xHeadersList.length + 1) + ', 1fr)' };
      } else {
        return { 'grid-template-columns' : '25% 75%' };
      }
    }
  }

  xheader(i) {
    return {
      'grid-column': + (i + 1) + '/' + (i + 2),
      'grid-row': '1 / 2',
    };
  }

  yheader(i) {
    return {
      'grid-row': + (i + 1) + '/' + (i + 2),
      'grid-column': '1 / 2',
    };
  }
}

