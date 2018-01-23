import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';


import { SelectData, createSelectData } from '../../global/models/interfaces';
import { Years } from './../../global/models/data';
import { TeacherService } from '../teacher.service';
import { SchoolCourse } from './../../global/models/classes';

@Component({
  selector: 'app-school-course-dialog',
  template: `
  <app-school-course-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-school-course-create-form>
  `
})
export class SchoolCourseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SchoolCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-school-course-create-form',
  template: `
  <form novalidate [formGroup]="form">
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <mat-input-container class="full-width" floatPlaceholder="auto">
  <input matInput formControlName="id"
         type="text"
         required
         placeholder="Course Id">
</mat-input-container>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <input matInput formControlName="title"
               type="text"
               required
               placeholder="Course Title">
    </mat-input-container>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <textarea matInput formControlName="description" required
                  placeholder="Course Description"></textarea>
    </mat-input-container>
    <mat-select class="full-width" formControlName="learningYear" placeholder="Learning Year">
      <mat-option *ngFor="let choice of yearsList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
    </mat-select>
    <mat-select class="full-width" formControlName="learningArea" placeholder="Learning Area">
      <mat-option *ngFor="let choice of areasList | async" [value]="choice.value">
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
export class SchoolCourseCreateFormComponent implements OnInit {
  @Input() currentFormValues?: SchoolCourse;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add School Course';
  edit: Boolean = false;

  readonly years = Years;
  yearsList: SelectData[] = [];
  areasList: Observable<SelectData[]>;

  constructor(private fb: FormBuilder, private ts: TeacherService) {
   }

  ngOnInit() {
    this.years.forEach(x => this.yearsList.push(createSelectData(x, x)));
    this.areasList = this.ts.findList('learningArea').map(value => {
        return value.map(c => createSelectData(c.payload.key, c.payload.val().title)); });

    this.form = this.fb.group({
        title: '',
        description: '',
        learningYear: '2017',
        learningArea: '',
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
    });
  }
}
