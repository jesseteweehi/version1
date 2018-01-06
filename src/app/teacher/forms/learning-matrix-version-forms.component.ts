import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { LearningMatrixVersion } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { Years, Levels } from './../../global/models/data';
import { Observable } from 'rxjs/Observable';


// Put the Matrix Profile under its own heading with a Data Key.
// retrieve the MATRIX PROFILE with a data button to get the rest.
// Versioning?


@Component({
  selector: 'app-learning-matrix-version-dialog',
  template: `
  <app-learning-matrix-version-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-learning-matrix-version-create-form>
  `
})
export class LearningMatrixVersionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningMatrixVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-matrix-version-create-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <form novalidate [formGroup]="form" (keyup.enter)="save()">
  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="title"
             type="text"
             required
             placeholder="Title">
  </mat-input-container>
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
export class LearningMatrixVersionCreateFormComponent implements OnInit {
  @Input() currentFormValues?: LearningMatrixVersion;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning Matrix Version';
  edit: Boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
    });
    if (this.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({data: this.form, edit: this.edit}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      title: this.currentFormValues.title,
    });
  }

}


