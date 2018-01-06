import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { LearningMatrix } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { Years, Levels } from './../../global/models/data';
import { Observable } from 'rxjs/Observable';


// Put the Matrix Profile under its own heading with a Data Key.
// retrieve the MATRIX PROFILE with a data button to get the rest.
// Versioning?


@Component({
  selector: 'app-learning-matrix-dialog',
  template: `
  <app-learning-matrix-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-learning-matrix-create-form>
  `
})
export class LearningMatrixDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningMatrixDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-matrix-create-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <form novalidate [formGroup]="form">
  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="title"
             type="text"
             required
             placeholder="Group Title">
  </mat-input-container>
  <mat-input-container class="full-width" floatPlaceholder="auto">
      <textarea matInput matTextareaAutosize formControlName="description" required
                placeholder="Group Description"></textarea>
  </mat-input-container>
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
export class LearningMatrixCreateFormComponent implements OnInit {
  @Input() currentFormValues?: LearningMatrix;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning Matrix';
  edit: Boolean = false;

  constructor(private fb: FormBuilder, private ts: TeacherService) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: ''
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
      description: this.currentFormValues.description,
    });
  }

}


