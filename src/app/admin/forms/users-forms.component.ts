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
    <div formGroupName="profile">
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="email"
                 type="text"
                 placeholder="Email Address">
      </mat-input-container>
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="photoUrl"
                 type="text"
                 placeholder="Link to Photo">
      </mat-input-container>
      <mat-input-container class="full-width" floatPlaceholder="auto">
          <input matInput formControlName="displayName"
                 type="text"
                 placeholder="Display Name">
      </mat-input-container>
      </div>
      <div fxLayout="column" formGroupName="role">
      <mat-checkbox formControlName="admin" value="false" color="primary">Administrator</mat-checkbox>
      <mat-checkbox formControlName="teacher" value="false" color="primary">Teacher</mat-checkbox>
      <mat-checkbox formControlName="subscriber" value="false" color="primary">Subscriber</mat-checkbox>
      </div>
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
    button {
        margin-top: 20px;
    }
    `]
  })

  export class UserCreateFormComponent implements OnInit {
    @Input() currentFormValues: UserProfile;
    @Output() formToSend = new EventEmitter();
    form: FormGroup;
    heading = 'Edit User';

    constructor(private fb: FormBuilder) {
     }

    ngOnInit() {
      this.form = this.fb.group({
        profile: this.fb.group({
          email: '',
          photoUrl: '',
          displayName: 'No Name',
        }),
        role: this.fb.group({
          admin: false,
          teacher: false,
          subscriber: false,
        }),
      });

      if (this.currentFormValues) {
        this.setFormValues();
      }
    }

    save() {this.formToSend.emit({data: this.form}); }

    setFormValues() {
      this.form.patchValue({ profile : {
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
