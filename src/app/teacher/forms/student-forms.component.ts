import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { Student } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { YearLevels, Ethnicity } from './../../global/models/data';
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
        <mat-radio-button value="G">Male</mat-radio-button>
    </mat-radio-group>

  <mat-select class="full-width" formControlName="yrLvl" placeholder="Student Year Level">
      <mat-option *ngFor="let choice of yearsLevelsList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>

  <mat-select class="full-width" formControlName="ethnic1" placeholder="Ethnicity 1">
      <mat-option *ngFor="let choice of ethnicityList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>

  <mat-select class="full-width" formControlName="ethnic2" placeholder="Ethnicity 2">
      <mat-option *ngFor="let choice of ethnicityList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>

  <mat-select class="full-width" formControlName="ethnic3" placeholder="Ethnicity 3">
      <mat-option *ngFor="let choice of ethnicityList" [value]="choice.value">
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
export class StudentCreateFormComponent implements OnInit {
  @Input() currentFormValues?: Student;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Student';
  edit: Boolean = false;

  readonly yearLvls = YearLevels;
  readonly ethnicity = Ethnicity;

  ethnicityList: SelectData[] = [];
  yearsLevelsList: SelectData[] = [];

  constructor(private fb: FormBuilder, private ts: TeacherService) { }

  ngOnInit() {
    this.yearLvls.forEach(x => this.yearsLevelsList.push(createSelectData(x, x)));
    this.ethnicity.forEach(x => this.ethnicityList.push(createSelectData(x, x)));

    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      gender: '',
      id: '18',
      yrLvl: 'Year 9',
      ethnic1: '',
      ethnic2: '',
      ethnic3: ''
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


