import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { TeacherService } from '../teacher.service';
import { LearningMatrix, LearningMatrixVersion } from './../../global/models/classes';

@Component({
  selector: 'app-matrix-dialog-list',
  template: `
  <app-matrix-select-list
  (formToSend)="handleForm($event)">
  </app-matrix-select-list>
  `
})
export class MatrixDialogListComponent {

  constructor(
    public dialogRef: MatDialogRef<MatrixDialogListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}


@Component({
  selector: 'app-matrix-select-list',
  template: `
  <mat-vertical-stepper [linear]="true">
    <mat-step label="Choose Matrix">
      <mat-list dense>
        <mat-list-item *ngFor="let item of items | async">
          <h3 mat-subheader>{{item?.title}}</h3>
          <span class="example-spacer"></span>
          <p>{{item?.lastModified | date}}</p>
          <button mat-icon-button color="primary" matStepperNext (click)="first(item)">
            <mat-icon class="mat-18">navigate_next</mat-icon>
          </button>
          </mat-list-item>
        </mat-list>
    </mat-step>
    <mat-step label="Choose Matrix Version">
      <mat-list dense>
        <mat-list-item *ngFor="let item of versions | async">
          <h3 mat-subheader>{{item?.title}}</h3>
          <span class="example-spacer"></span>
          <p>{{item?.lastModified | date}}</p>
          <button mat-icon-button color="primary" matStepperNext (click)="second(item)">
            <mat-icon class="mat-18">navigate_next</mat-icon>
          </button>
        </mat-list-item>
    </mat-list>
      <div>
        <button mat-button matStepperPrevious>Back</button>
         <button mat-button matStepperNext>Next</button>
      </div>
    </mat-step>
    <mat-step label="Load Matrix Version">
        Matrix Version 1 
      <div>
        <button mat-button matStepperPrevious>Back</button>
         <button mat-button>Load</button>
      </div>
    </mat-step>
</mat-vertical-stepper>
`,
styles: [`
mat-list-item:hover {
  background-color: whitesmoke;
}
`]
})

export class MatrixSelectListComponent implements OnInit {
@Output() formToSend = new EventEmitter();
items: Observable<LearningMatrix[]>;
versions: Observable<LearningMatrixVersion[]>;

versionId$: BehaviorSubject<string|null>;

constructor(private ts: TeacherService) { }

ngOnInit() {
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

save(item) {this.formToSend.emit(item);}
}



// @Component({
//     selector: 'app-matrix-select-list',
//     template: `
//     <mat-selection-list #list [(ngModel)]="selectedOptions">
//         <mat-list-option *ngFor="let item of items | async" [value]="item.key">
//         {{item.title}} {{item.description}}
//         </mat-list-option>
//     </mat-selection-list>
//     <button mat-dialog-close mat-button (click)="save()" color="primary">Save</button>
//     `
// })

// export class MatrixSelectListComponent implements OnInit {
//   @Output() formToSend = new EventEmitter();
//   items: Observable<LearningMatrix[]>

//   selectedOptions: string[] = ['Area 3'];
//   constructor(private ts: TeacherService) { }

//   ngOnInit() {
//     this.items = this.ts.findList('learningMatrix').map(changes => changes.map(c => LearningMatrix.fromJson(c.key, {...c.payload.val()})) );
//   }

//   save() {this.formToSend.emit(this.selectedOptions);}
// }
