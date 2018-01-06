import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningMatrix, LearningMatrixVersion } from './../../global/models/classes';
import { LearningMatrixVersionDialogComponent } from './../forms/learning-matrix-version-forms.component';
import { TeacherService } from '../teacher.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-learning-matrix-version-list',
  templateUrl: './learning-matrix-version-list.component.html',
  styleUrls: ['./learning-matrix-version-list.component.css']
})
export class LearningMatrixVersionListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningMatrixVersionDialogComponent>;
  groupId: string;
  group: Observable<LearningMatrix>;
  items: Observable<LearningMatrixVersion>;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['matrixid'];
    this.group = this.ts.findObjectKey('learningMatrix', this.groupId)
                  .map(item => LearningMatrix.fromJson(item.key, {...item.payload.val()}));

    this.items = this.ts.findItemForObjectList('learningMatrixVersionForMatrix', 'learningMatrixVersion', this.groupId)
                  .map(changes => changes.map(c => LearningMatrixVersion.fromJson(c.key, {...c.payload.val()})));
  }

  add(item?: LearningMatrixVersion) {
    this.DialogRef = this.dialog.open(LearningMatrixVersionDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        console.log(x)
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningMatrixVersion/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningMatrixVersion(this.groupId, x.data.value), 'Learning Matrix Version Added');
        }
      });
  }

  delete(item: LearningMatrixVersion) {
    this.messagefromPromise(this.ts.changeObject(`/learningMatrixVersionForMatrix/${this.groupId}/${item.key}`),
    'Learning Matrix Version Deleted');
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
