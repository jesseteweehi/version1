import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { Purpose,  Orientation } from './../../global/models/data';
import { TeacherService } from '../teacher.service';
import { LearningMatrix } from './../../global/models/classes';


@Component({
  selector: 'app-learning-matrix-cell-dialog',
  template: `
  <app-learning-matrix-cell-create-form
  (formToSend)="handleForm($event)"
  [data]="data"
  >
  </app-learning-matrix-cell-create-form>
  `
})
export class LearningMatrixCellDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningMatrixCellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-matrix-cell-create-form',
  template: `
  <form novalidate [formGroup]="form">
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <input matInput formControlName="title"
               type="text"
               required
               placeholder="Title">
    </mat-input-container>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <textarea matInput formControlName="description" required
                  placeholder="Description"></textarea>
    </mat-input-container>
    <h4 class="mat-typography subheading-1">Qualifying Header</h4>
    <mat-radio-group class="full-width" formControlName="qualifier" placeholder="Qualfier" [align]="'start'">
        <mat-radio-button value="x">X Header</mat-radio-button>
        <mat-radio-button value="y">Y Header</mat-radio-button>
    </mat-radio-group>
    <mat-select class="full-width" formControlName="xheaders" placeholder="X Headers">
      <mat-option *ngFor="let choice of xHeadersList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
    </mat-select>
    <mat-select class="full-width" formControlName="yheaders" placeholder="Y Headers">
      <mat-option *ngFor="let choice of yHeadersList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
    </mat-select>
    <button mat-dialog-close mat-button (click)="save()" color="primary">Save</button>
  </form>
  `,
  styles: [`
  mat-select {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .full-width {
    width: 100%;
  }
  `]
})
export class LearningMatrixCellCreateFormComponent implements OnInit {
  @Input() data: any;
  currentFormValues?: any;

  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Cell';
  edit: Boolean = false;

  readonly orientation = Orientation;
  readonly purpose = Purpose;
  purposeList: SelectData[] = [];
  xHeadersList: SelectData[] = [];
  yHeadersList: SelectData[] = [];

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    if (this.data.currentFormValues) {
      this.currentFormValues = this.data.currentFormValues;
    }
    this.purpose.forEach(x => this.purposeList.push(createSelectData(x, x)));
    this.data.xheaders.forEach(x => this.xHeadersList.push(createSelectData(x.title, x.title)));
    this.data.yheaders.forEach(x => this.yHeadersList.push(createSelectData(x.title, x.title)));



    this.form = this.fb.group({
      title: '',
      description: '',
      purpose: 'Descriptor',
      xheaders: '',
      yheaders: '',
      qualifier: 'Y Header',
    });

    if (this.data.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({data: this.form, edit: this.edit, index: this.data.index}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      title: this.currentFormValues.title,
      description: this.currentFormValues.description,
      purpose: this.currentFormValues.purpose,
      xheaders: this.currentFormValues.xheaders,
      yheaders: this.currentFormValues.yheaders,
      qualifier: this.currentFormValues.qualifier
    });
  }
}
