import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TeacherService } from './../../../teacher/teacher.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../models/classes';



@Component({
  selector: 'app-student-dialog-list',
  template: `
  <h1 matDialogTitle>Students</h1>
  <mat-dialog-content>
    <app-student-select-list
    [items]="items"
    (studentsToSend)="sendResult($event)"
    >
    </app-student-select-list>
  </mat-dialog-content>
  <mat-dialog-actions>
      <button mat-button matDialogClose>Close dialog</button>
      <button mat-button matDialogClose (click)="save()">Add</button>
  </mat-dialog-actions>
  `
})
export class StudentDialogListComponent implements OnInit {
  itemsToSave: string[];
  items: Observable<Student[]>;
  constructor(
    public dialogRef: MatDialogRef<StudentDialogListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TeacherService) {}

    ngOnInit() {
      this.items = this.ts.findList(`studentProfile`)
                    .map(changes => changes
                    .map(c => Student.fromJson(c.key, {...c.payload.val()})));
    }

    save() {
      console.log(this.itemsToSave);
      this.dialogRef.close(this.itemsToSave);
    }

    sendResult($event) {
      this.itemsToSave = $event;
    }
}
