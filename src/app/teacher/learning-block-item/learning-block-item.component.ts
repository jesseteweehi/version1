import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningBlock, LearningMatrix, LearningMatrixVersion, Header, Cell, Student } from './../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { StudentDialogListAddComponent,
         StudentDialogListRemoveComponent,
         StudentDialogListRemoveEnrolledComponent } from '../../global/global-components/student-dialog-list/student-dialog-list.component';


@Component({
  selector: 'app-learning-block-item',
  templateUrl: './learning-block-item.component.html',
  styleUrls: ['./learning-block-item.component.css']
})
export class LearningBlockItemComponent implements OnInit {
  studentAddDialog: MatDialogRef<StudentDialogListAddComponent>;
  studentRemoveDialog: MatDialogRef<StudentDialogListRemoveComponent>;
  studentEnrollDialog: MatDialogRef<StudentDialogListRemoveEnrolledComponent>;
  // Initial
  groupId: string;
  blockId: string;
  block: Observable<LearningBlock>;

  // Items for Loading a Matrix (Should set this its on Component)
  matrixLoad: Boolean = false;
  items: Observable<LearningMatrix[]>;
  versions: Observable<LearningMatrixVersion[]>;
  versionId$: BehaviorSubject<string|null>;
  chosenMatrixVersion: LearningMatrixVersion;
  chosenMatrixVersionData: any;

  // Items for Loading a Block
  xHeadersList: any[];
  yHeadersList: any[];
  cellsList: any[];

  constructor(private route: ActivatedRoute,
    private location: Location,
    private ts: TeacherService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    // Initial
    this.blockId = this.route.snapshot.params['blockid'];
    this.groupId = this.route.snapshot.params['groupid'];
    this.block = this.ts.findObjectKey('learningBlock', this.blockId)
                  .map(item => LearningBlock.fromJson(item.key, {...item.payload.val()}));
    // Block
    const xHeader = this.ts.findList(`header/${this.blockId}/xheader`)
                    .map(changes => changes.map((c => Header.fromJson(c.key, {...c.payload.val()}))));
    const yHeader = this.ts.findList(`header/${this.blockId}/yheader`)
                    .map(changes => changes.map((c => Header.fromJson(c.key, {...c.payload.val()}))));
    const cells = this.ts.findItemForObjectList('learningCellForBlock', 'learningCell', this.blockId)
                  .map(changes => changes.map(c => Cell.fromJson(c.key, {...c.payload.val()})));

    xHeader.subscribe(x => this.xHeadersList = x);
    yHeader.subscribe(y => this.yHeadersList = y);
    cells.subscribe(c => this.cellsList = c);
  }

  multi(b: boolean) {
    this.messagefromPromise(this.ts.multiLearningBlock(this.blockId, b), 'Block now Multi');
  }

  lock() {
    this.messagefromPromise(this.ts.lockLearningBlock(this.blockId), 'Block Locked')
    this.matrixLoad = false;
  }

  clear() {
    this.messagefromPromise(this.ts.clearLearningBlockData(this.blockId), 'Block Cleared');
    this.cellsList = [];
  }

  enroll() {
    this.openStudents()
  }

  unenroll() {
    this.unenrollStudents()
  }

  unenrollStudents() {
    this.studentEnrollDialog = this.dialog.open(StudentDialogListRemoveEnrolledComponent, {
        data: this.blockId,
        height: '90%',
        width: '90%',
        autoFocus: false,
    });
    this.studentEnrollDialog.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        this.messagefromPromise(this.ts.unenrollStudentsFromBlock(x, this.blockId), 'Students Unenrolled');
      });
  }

  openStudents(key?: string) {
    // Need to transfer the fetching Data from the Dialog to Here
    this.studentAddDialog = this.dialog.open(StudentDialogListAddComponent, {
      height: '90%',
      width: '90%',
      autoFocus: false,
    });
    this.studentAddDialog.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        this.messagefromPromise(this.ts.enrollStudentsInBlock(x, this.blockId ), 'Students Placed');
      });
  }

  loadMatrix() {
     // Loading Matrix
     this.items = this.ts.findList('learningMatrix')
                  .map(changes => changes.map(c => LearningMatrix.fromJson(c.key, {...c.payload.val()})) );
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

  show(x: boolean) {
    if (x === true) {
      this.matrixLoad = true;
      this.loadMatrix();
    } else {
      this.matrixLoad = false;
    }
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
