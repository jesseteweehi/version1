import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData, Header } from '../../global/models/interfaces';
import { Purpose,  Orientation } from './../../global/models/data';
import { TeacherService } from '../teacher.service';
import { LearningMatrix } from './../../global/models/classes';

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
                  placeholder="Area Description"></textarea>
    </mat-input-container>
    <mat-select class="full-width" formControlName="orientation" placeholder="Orientation">
      <mat-option *ngFor="let choice of orientationList" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
    </mat-select>
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
export class LearningMatrixCreateFormComponent implements OnInit {
  @Input() currentFormValues?: Header;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning matrix';
  edit: Boolean = false;

  readonly orientation = Orientation;
  readonly purpose = Purpose;
  orientationList: SelectData[] = [];
  purposeList: SelectData[] = [];

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.orientation.forEach(x => this.orientationList.push(createSelectData(x, x)));
    this.purpose.forEach(x => this.purposeList.push(createSelectData(x, x)));

    this.form = this.fb.group({
      title: '',
      description: '',
      purpose: 'Descriptor',
      orientation: 'Y'
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
      purpose: this.currentFormValues.purpose,
      orientation: this.currentFormValues.orientation
    });
  }
}
