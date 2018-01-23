import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningBlock, LearningMatrix, LearningMatrixVersion } from './../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { MatrixDialogListComponent } from '../dialogs-list/learning-matrix-dialog-list.component';


@Component({
  selector: 'app-learning-block-item',
  templateUrl: './learning-block-item.component.html',
  styleUrls: ['./learning-block-item.component.css']
})
export class LearningBlockItemComponent implements OnInit {
  // Initial
  DialogRef: MatDialogRef<MatrixDialogListComponent>;
  blockId: string;
  block: Observable<LearningBlock>;

  // Items for Loading a Matrix
  items: Observable<LearningMatrix[]>;
  versions: Observable<LearningMatrixVersion[]>;
  versionId$: BehaviorSubject<string|null>;
  chosenMatrixVersion: LearningMatrixVersion;
  chosenMatrixVersionData: any;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private ts: TeacherService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.blockId = this.route.snapshot.params['blockid'];
    this.block = this.ts.findObjectKey('learningBlock', this.blockId)
                  .map(item => LearningBlock.fromJson(item.key, {...item.payload.val()}));

    this.items = this.ts.findList('learningMatrix').map(changes => changes.map(c => LearningMatrix.fromJson(c.key, {...c.payload.val()})) );
    this.versionId$ = new BehaviorSubject(null);
    this.versions = this.versionId$
    .filter(x => x !== null)
    .do(x => console.log(x))
    .switchMap(s => this.ts.findItemForObjectList('learningMatrixVersionForMatrix', 'learningMatrixVersion', s)
             .map(changes => changes.map(c => LearningMatrixVersion.fromJson(c.key, {...c.payload.val()}))));

  }
  first(item) {
    this.versionId$.next(item.key);
  }

  second(item) {
    const data = this.ts.findObjectPath(`learningMatrixVersionData/${item.key}`);

    data.subscribe(result => {
      const resultData = result.payload.val();
      if (resultData) {this.chosenMatrixVersionData = resultData; }
    });

    this.chosenMatrixVersion = item;
  }

  load() {
    if (this.chosenMatrixVersionData) {
      this.ts.saveLearningBlockData(this.blockId, this.chosenMatrixVersionData)
    }
  }

  add() {
    this.DialogRef = this.dialog.open(MatrixDialogListComponent);
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        console.log(x);
      });
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

  goBack(): void {
    this.location.back();
  }

}
