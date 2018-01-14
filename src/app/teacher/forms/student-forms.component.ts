import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { Student } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { yearLevels } from './../../global/models/data';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-student-dialog',
  template: `
  <app-student-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-student-create-form>
  `
})
export class StudentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-student-create-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <form novalidate [formGroup]="form">

  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="id"
             type="text"
             required
             placeholder="Students Identification Number">
  </mat-input-container>

  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="firstName"
             type="text"
             required
             placeholder="Students First Name">
  </mat-input-container>

  <mat-input-container class="full-width" floatPlaceholder="auto">
      <input matInput formControlName="lastName"
             type="text"
             required
             placeholder="Students Last Name">
  </mat-input-container>

  <h4 class="mat-typography subheading-1">Gender</h4>
    <mat-radio-group class="full-width" formControlName="gender" placeholder="Gender" [align]="'start'">
        <mat-radio-button value="F">Female</mat-radio-button>
        <mat-radio-button value="G">Mail</mat-radio-button>
    </mat-radio-group>

  <mat-input-container class="full-width" floatPlaceholder="auto">
      <textarea matInput matTextareaAutosize formControlName="yrLvl" required
                placeholder="Students Year Level"></textarea>
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
export class StudentCreateFormComponent implements OnInit {
  @Input() currentFormValues?: Student;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning Area';
  edit: Boolean = false;

  readonly yearLvls = yearLevels;

  yearsLevelsList: SelectData[] = [];

  constructor(private fb: FormBuilder, private ts: TeacherService) { }

  ngOnInit() {
    this.yearLvls.forEach(x => this.yearsLevelsList.push(createSelectData(x, x)));

    this.form = this.fb.group({
      title: '',
      description: '',
      learningYear: '2017',
      learningArea: '',
      learningLevel: '',
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
      learningYear: this.currentFormValues.learningYear,
      learningArea: this.currentFormValues.learningArea,
      learningLevel: this.currentFormValues.learningLevel,
      created: this.currentFormValues.created
    });
  }

}


