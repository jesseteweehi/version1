import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { TeacherService } from '../models/teacher.service';
import { LearningTimeframe } from './../../global/models/classes';



@Component({
  selector: 'app-learning-timeframe-dialog',
  template: `
  <app-learning-timeframe-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-learning-timeframe-create-form>
  `
})
export class LearningTimeframeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningTimeframeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event){
    this.dialogRef.close($event)
    }
}


@Component({
  selector: 'app-learning-timeframe-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <div [formGroup]="formGroup">
    <mat-select formControlName="year" placeholder="Year">
        <mat-option *ngFor="let choice of choices" [value]="choice.value">
            {{choice.viewValue}}
        </mat-option>
    </mat-select>
  </div>
  `,
  styles: [`
  mat-select {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  `]
})
export class LearningTimeframeFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() heading: string;
  choices: SelectData[] = [];
  years = ['2017', '2018', '2019', '2020'];
  
  constructor() {
  }
  ngOnInit() {
    this.years.forEach(element => {
      this.choices.push(createSelectData(element, element));
    });
  }
}

@Component({
  selector: 'app-learning-timeframe-create-form',
  template: `
  <form novalidate [formGroup]="form">
    <app-learning-timeframe-form
    [formGroup]="form"
    [heading]="heading">
    </app-learning-timeframe-form>
    <button mat-dialog-close mat-button (click)="save()" color="primary">Save</button>
  </form>
  `,
  styles: [`
  `]
})
export class LearningTimeframeCreateFormComponent implements OnInit {
  @Input() currentFormValues: LearningTimeframe;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Timeframe';
  edit: Boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      year: ''
    });

    if (this.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({'data': this.form, 'edit': this.edit}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      year: this.currentFormValues.year
    });
  }
}
