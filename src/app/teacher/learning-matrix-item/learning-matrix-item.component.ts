import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningMatrixVersion, LearningMatrix } from './../../global/models/classes';
import { LearningMatrixCellDialogComponent } from './../forms/learning-matrix-cell-forms.component';
import { LearningMatrixHeaderDialogComponent } from './../forms/learning-matrix-header-forms.component';
import { LearningMatrixVersionDialogComponent } from './../forms/learning-matrix-version-forms.component';


import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-learning-matrix-item',
  templateUrl: './learning-matrix-item.component.html',
  styleUrls: ['./learning-matrix-item.component.css']
})
export class LearningMatrixItemComponent implements OnInit {
  headerDialogRef: MatDialogRef<LearningMatrixHeaderDialogComponent>;
  cellDialogRef: MatDialogRef<LearningMatrixCellDialogComponent>;
  versionDialogRef: MatDialogRef<LearningMatrixVersionDialogComponent>;
  groupId: string;
  group: Observable<LearningMatrix>;
  items: Observable<LearningMatrixVersion>;
  data: Observable<any>;

  versionId$: BehaviorSubject<string|null>;


  learningAreaItems: object;
  xHeadersList: any[] = [];
  yHeadersList: any[] = [];
  cellsList: any[] = [];

  constructor(private ts: TeacherService,
              private route: ActivatedRoute,
              private location: Location,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['matrixid'];
    this.group = this.ts.findObjectKey('learningMatrix', this.groupId)
                  .map(item => LearningMatrix.fromJson(item.key, {...item.payload.val()}));

    this.items = this.ts.findItemForObjectList('learningMatrixVersionForMatrix', 'learningMatrixVersion', this.groupId)
                  .map(changes => changes.map(c => LearningMatrixVersion.fromJson(c.key, {...c.payload.val()})));

    this.versionId$ = new BehaviorSubject(null);

    const data$ = this.versionId$.switchMap(s => this.ts.findObjectPath(`learningMatrixVersionData/${s}`));
    data$.subscribe(result => {
      console.log(result);
      const data = result.payload.val();
      console.log(data);
      this.xHeadersList = data.xheader;
      // this.yHeadersList = data.yheader;
      // this.cellsList = data.cells;
    });

  }

  filterBy(item) {
    this.versionId$.next(item.key);
  }

//   const size$ = new Subject<string>();
// const queryObservable = size$.switchMap(size =>
//   db.list('/items', ref => ref.orderByChild('size').equalTo(size)).valueChanges()
// );

// // subscribe to changes
// queryObservable.subscribe(queriedItems => {
//   console.log(queriedItems);  
// });

// // trigger the query
// size$.next('large');

// // re-trigger the query!!!
// size$.next('small');

  saveNewTemplate(item) {
    return this.ts.createLearningMatrixData(this.groupId, this.xHeadersList, this.yHeadersList, this.cellsList, item );
  }

  saveTemplate(item) {
    return this.ts.saveLearningMatrixData(item.key, this.xHeadersList, this.yHeadersList, this.cellsList);
  }

  getKeyFromArray(item, a) {
    return a.findIndex(item);
  }

  addVersion (item?: LearningMatrixVersion) {
    this.versionDialogRef = this.dialog.open(LearningMatrixVersionDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.versionDialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        console.log(x)
        if (x.edit) {
        this.messagefromPromise(this.saveTemplate(x.data.value), 'Data Saved');
        } else {
        this.messagefromPromise(this.saveNewTemplate(x.data.value), 'Data Saved');
        }
      });
  }

  deleteVersion(item: LearningMatrixVersion) {
    this.messagefromPromise(this.ts.changeObject(`/learningMatrixVersionForMatrix/${this.groupId}/${item.key}`),
    'Learning Matrix Version Deleted');
  }

  addHeader(a: any[], item?: any, i?: number) {
    this.headerDialogRef = this.dialog.open(LearningMatrixHeaderDialogComponent, {
      data: {
        currentFormValues: item,
        array: a,
        index: i
      }
    });
    this.headerDialogRef.afterClosed()
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

  addCell(a: any[], item?: any, i?: number) {
    this.cellDialogRef = this.dialog.open(LearningMatrixCellDialogComponent, {
      data: {
        currentFormValues: item,
        array: a,
        xheaders: this.xHeadersList,
        yheaders: this.yHeadersList,
        index: i
      }
    });
    this.cellDialogRef.afterClosed()
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

  goBack(): void {
    this.location.back();
  }
}

