import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { LearningMatrixVersion } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { Observable } from 'rxjs/Observable';
import { Cohort } from './../../global/models/classes';


@Component({
  selector: 'app-cohort-dialog',
  template: `
  <app-cohort-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-cohort-create-form>
  `
})
export class CohortDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CohortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-cohort-create-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <form novalidate [formGroup]="form">
  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="title"
             type="text"
             placeholder="Title">
  </mat-input-container>
  <mat-input-container class="full-width" floatPlaceholder="auto">
        <textarea matInput formControlName="description"
                  placeholder="Cohort Description"></textarea>
  </mat-input-container>
  <button [disabled]="!form.valid" mat-dialog-close mat-button (click)="save()" color="primary">Save</button>
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
export class CohortCreateFormComponent implements OnInit {
  @Input() currentFormValues?: Cohort;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Cohort';
  edit: Boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(150)]
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


