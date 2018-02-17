import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectData, createSelectData } from '../../global/models/interfaces';
import { UserProfile } from './../../global/models/classes';

@Component({
  selector: 'app-user-dialog',
  template: `
  <app-user-create-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-user-create-form>
  `
})
export class UserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
    selector: 'app-user-create-form',
    template: `
    <form novalidate [formGroup]="form">
    <h4 class="mat-typography subheading-1">{{heading}}</h4>
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="profile.email"
                 type="text"
                 required
                 placeholder="email">
      </mat-input-container>
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="profile.photoUrl"
                 type="text"
                 required
                 placeholder="Photo URL">
      </mat-input-container>
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="profile.displayName"
                 type="text"
                 required
                 placeholder="displayName">
      </mat-input-container>
      <mat-radio-button value="true" formControlName="role.admin"></mat-radio-button>
      <mat-radio-button value="true" formControlName="role.teacher"></mat-radio-button>
      <mat-radio-button value="true" formControlName="role.subscriber"></mat-radio-button>
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

  export class UserCreateFormComponent implements OnInit {
    @Input() currentFormValues?: UserProfile;
    @Output() formToSend = new EventEmitter();
    form: FormGroup;
    heading = 'Add Learning Area';
    edit: Boolean = false;

    constructor(private fb: FormBuilder) {
     }

    ngOnInit() {
      this.form = this.fb.group({
        profile: this.fb.group({
          email: '',
          photoUrl: '',
          displayName: '',
        }),
        role: this.fb.group({
          admin: null,
          teacher: null,
          subscriber: null,
        }),
      });

      if (this.currentFormValues) {
        this.setFormValues();
      }
    }

    save() {this.formToSend.emit({data: this.form, edit: this.edit}); }

    setFormValues() {
      this.edit = true;
      this.form.setValue({ profile : {
        email: this.currentFormValues.profile.email,
        photoUrl: this.currentFormValues.profile.photoUrl,
        displayName: this.currentFormValues.profile.displayName, },
        role : {
          admin: this.currentFormValues.role.admin,
          teacher: this.currentFormValues.role.teacher,
          subscriber: this.currentFormValues.role.subscriber
        }});
    }
  }
