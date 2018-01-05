import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningGroup, LearningArea } from './../../global/models/classes';
import { LearningMatrixDialogComponent } from './../forms/learning-matrix-forms.component';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-learning-matrix-list',
  templateUrl: './learning-matrix-list.component.html',
  styleUrls: ['./learning-matrix-list.component.css']
})
export class LearningMatrixListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningMatrixDialogComponent>;

  learningGroupItems: LearningGroup[];
  learningAreaItems: object;
  xHeadersList: any[] = [];
  yHeadersList: any[] = [];



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

  deleteFromArray(item, a) {
    const index = this.getKeyFromArray(item, a);
    if (index > -1) {
      a.splice(index , 1);
    }
  }

  add(a: any[], item?: any) {
    this.DialogRef = this.dialog.open(LearningMatrixDialogComponent, {
      data: {
        currentFormValues: item,
        array: a,
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
          const index = x.data.value.index;
          if (index !== -1) {
            a[index] = x.data.value;
          }
        } else {
          a.push(x.data.value)
        }
      });
  }

  delete(a: any[], item: any) {
    this.deleteFromArray(item, a);
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

