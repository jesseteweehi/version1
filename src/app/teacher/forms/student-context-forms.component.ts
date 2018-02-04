import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { TeacherService } from '../teacher.service';
import { StudentContext } from './../../global/models/classes';

@Component({
  selector: 'app-student-context-dialog',
  template: `
  <app-student-context-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-student-context-create-form>
  `
})
export class StudentContextDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentContextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-student-context-create-form',
  template: `
  <form novalidate [formGroup]="form">
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <input matInput formControlName="context"
               type="text"
               required
               placeholder="Context">
    </mat-input-container>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <input matInput formControlName="furtherInformationUrl"
               type="text"
               required
               placeholder="Link to More">
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
export class StudentContextCreateFormComponent implements OnInit {
  @Input() currentFormValues?: StudentContext;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Student Context for this Block';
  edit: Boolean = false;

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      context: '',
      furtherInformationUrl: '',

    });
    if (this.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({data: this.form, edit: this.edit}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      context: this.currentFormValues.context,
      furtherInformationUrl: this.currentFormValues.furtherInformationUrl
    });
  }
}
