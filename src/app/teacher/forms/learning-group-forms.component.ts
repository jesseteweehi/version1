import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { LearningGroup } from '../../global/models/classes';
import { TeacherService } from '../teacher.service';
import { SelectControlValueAccessor } from '@angular/forms/src/directives/select_control_value_accessor';
import { Years, Levels } from './../../global/models/data';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-learning-group-dialog',
  template: `
  <app-learning-group-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-learning-group-create-form>
  `
})
export class LearningGroupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-group-create-form',
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
  <mat-select class="full-width" formControlName="learningArea" placeholder="Learning Area">
      <mat-option *ngFor="let choice of areasList | async" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>
  <mat-select class="full-width" formControlName="learningLevel" placeholder="Learning Level">
      <mat-option *ngFor="let choice of levelsList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>
  <mat-select class="full-width" formControlName="learningYear" placeholder="Learning Year">
      <mat-option *ngFor="let choice of yearsList" [value]="choice.value">
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
export class LearningGroupCreateFormComponent implements OnInit {
  @Input() currentFormValues?: LearningGroup;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning Area';
  edit: Boolean = false;

  readonly years = Years;
  readonly levels = Levels;
  yearsList: SelectData[] = [];
  levelsList: SelectData[] = [];
  areasList: Observable<SelectData[]>;



  constructor(private fb: FormBuilder, private ts: TeacherService) { }

  ngOnInit() {
    this.years.forEach(x => this.yearsList.push(createSelectData(x, x)));
    this.levels.forEach(x => this.levelsList.push(createSelectData(x, x)));
    this.areasList = this.ts.findList('learningArea').map(value => {
      return value.map(c => createSelectData(c.payload.key, c.payload.val().title));});

    this.form = this.fb.group({
      title: '',
      description: '',
      learningYear: '2017',
      learningArea: '',
      learningLevel: ''
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
    });
  }

}


