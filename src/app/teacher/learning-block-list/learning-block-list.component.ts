import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { LearningBlock, LearningGroup } from './../../global/models/classes';
import { LearningBlockDialogComponent } from './../forms/learning-block-forms.component';
import { TeacherService } from '../teacher.service';





@Component({
  selector: 'app-learning-block-list',
  templateUrl: './learning-block-list.component.html',
  styleUrls: ['./learning-block-list.component.css']
})
export class LearningBlockListComponent implements OnInit {
  DialogRef: MatDialogRef<LearningBlockDialogComponent>;
  groupId: string;
  group: Observable<LearningGroup>;
  items: Observable<LearningBlock>;

  constructor(private route: ActivatedRoute,
              private ts: TeacherService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupid'];
    this.group = this.ts.findObjectKey('learningGroup', this.groupId)
                  .map(item => LearningGroup.fromJson(item.key, {...item.payload.val()}));

    this.items = this.ts.findItemForObjectList('learningBlockForGroup', 'learningBlock', this.groupId)
                  .map(changes => changes.map(c => LearningBlock.fromJson(c.key, {...c.payload.val()})));
  }

  add(item?: LearningBlock) {
    this.DialogRef = this.dialog.open(LearningBlockDialogComponent, {
      data: {
        currentFormValues: item
      }
    });
    this.DialogRef.afterClosed()
      .filter(x => x !== undefined)
      .subscribe(x => {
        if (x.edit) {
        this.messagefromPromise(this.ts.changeObject(`/learningBlock/${item.key}`, x.data.value));
        } else {
        this.messagefromPromise(this.ts.createLearningBlock(this.groupId, x.data.value), 'Learning Block Added');
        }
      });
  }

  delete(item: LearningBlock) {
    this.messagefromPromise(this.ts.changeObject(`/learningBlockForGroup/${this.groupId}/${item.key}`), 'Learning Block Deleted');
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
