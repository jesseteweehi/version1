import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { TeacherService } from '../teacher.service';
import { LearningBlock } from './../../global/models/classes';

@Component({
  selector: 'app-learning-block-dialog',
  template: `
  <app-learning-block-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-learning-block-create-form>
  `
})
export class LearningBlockDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LearningBlockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-learning-block-create-form',
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
export class LearningBlockCreateFormComponent implements OnInit {
  @Input() currentFormValues?: LearningBlock;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Learning Block';
  edit: Boolean = false;

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: '',

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
      description: this.currentFormValues.description
    });
  }
}
