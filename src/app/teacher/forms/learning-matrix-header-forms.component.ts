import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData, Header } from '../../global/models/interfaces';
import { Purpose,  Orientation } from './../../global/models/data';
import { TeacherService } from '../teacher.service';
import { LearningMatrix } from './../../global/models/classes';


@Component({
  selector: 'app-learning-matrix-header-dialog',
  template: `
  <app-learning-matrix-header-create-form
  (formToSend)="handleForm($event)"
  [data]="data"
  >
  </app-learning-matrix-header-create-form>
  `
})
export class LearningMatrixHeaderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningMatrixHeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-matrix-header-create-form',
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
    <mat-select class="full-width" formControlName="purpose" placeholder="Purpose">
      <mat-option *ngFor="let choice of purposeList" [value]="choice.value">
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
export class LearningMatrixHeaderCreateFormComponent implements OnInit {
  @Input() data: any;
  currentFormValues?: Header;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Header';
  edit: Boolean = false;

  readonly orientation = Orientation;
  readonly purpose = Purpose;
  purposeList: SelectData[] = [];

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    if (this.data.currentFormValues) {
      this.currentFormValues = this.data.currentFormValues;
    }
    this.purpose.forEach(x => this.purposeList.push(createSelectData(x, x)));

    this.form = this.fb.group({
      title: '',
      description: '',
      purpose: 'Descriptor',
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
    });
  }
}
