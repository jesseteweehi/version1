import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-email-dialog',
  template: `
  <app-email-create-form
  (formToSend)="handleForm($event)"
  >
  </app-email-create-form>
  `
})
export class EmailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-email-create-form',
  template: `
  <form novalidate [formGroup]="form">
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
    <mat-input-container class="full-width" floatPlaceholder="auto">
        <input matInput formControlName="email"
               type="text"
               placeholder="Email">
    </mat-input-container>
    <button mat-dialog-close mat-button [disabled]="!form.valid" (click)="save()" color="primary">Save</button>
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
export class EmailCreateFormComponent implements OnInit {
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Email';

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
  }

  save() {this.formToSend.emit({data: this.form }); }
}
