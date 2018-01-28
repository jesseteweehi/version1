import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TeacherService } from './../../../teacher/teacher.service';

import { Observable, Subject } from 'rxjs/Rx';
import { Student } from './../../models/classes';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-student-dialog-list',
  template: `
  <h1 mat-dialog-title>Students</h1>
    <p *ngIf="items">Total : {{items?.length}}</p>
    <p *ngIf="itemsToSave"> Selected : {{itemsToSave?.length}}</p>
  <mat-dialog-content>
    <app-student-select-list
    [items]="items"
    (studentsToSend)="sendResult($event)"
    >
    </app-student-select-list>
  </mat-dialog-content>
  <mat-dialog-actions>
      <button mat-button matDialogClose>Close dialog</button>
      <button mat-button matDialogClose (click)="save()">Add Students</button>
  </mat-dialog-actions>
  `
})
export class StudentDialogListAddComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<any> = new Subject();

  itemsToSave: any[];
  items: any[];
  constructor(
    public dialogRef: MatDialogRef<StudentDialogListAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TeacherService) {}

    ngOnInit() {
      this.ts.findList(`studentProfile`)
      .map(changes => changes
      .map(c => Student.fromJson(c.key, {...c.payload.val()})))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => this.items = result)
    }

    save() {
      this.dialogRef.close(this.itemsToSave);
    }

    sendResult($event) {
      this.itemsToSave = $event;
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}

// Removing Student from learning Cell
@Component({
  selector: 'app-student-dialog-list',
  template: `
  <h1 mat-dialog-title>Students</h1>
    <p *ngIf="items">Total : {{items?.length}}</p>
    <p *ngIf="itemsToSave"> Selected : {{itemsToSave?.length}}</p>
  <mat-dialog-content>
    <app-student-select-list
    [items]="items"
    (studentsToSend)="sendResult($event)"
    >
    </app-student-select-list>
  </mat-dialog-content>
  <mat-dialog-actions>
      <button mat-button matDialogClose>Close dialog</button>
      <button mat-button matDialogClose (click)="save()">Remove Students</button>
  </mat-dialog-actions>
  `
})
export class StudentDialogListRemoveComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<any> = new Subject();

  itemsToSave: any[];
  items: any[];
  constructor(
    public dialogRef: MatDialogRef<StudentDialogListRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TeacherService) {}

    ngOnInit() {
      this.ts.findItemForObjectList('studentsForCell', 'studentProfile', this.data)
      .map(changes => changes
      .map(c => {
        if (c.payload.val()) {
          return Student.fromJson(c.key, {...c.payload.val()}); } }
      ))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => this.items = result);
    }

    save() {
      this.dialogRef.close(this.itemsToSave);
    }

    sendResult($event) {
      this.itemsToSave = $event;
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}


// Removing Student from Learning Block Enrolled
@Component({
  selector: 'app-student-dialog-list-enrolled',
  template: `
  <h1 mat-dialog-title>Students</h1>
    <p *ngIf="items">Total : {{items?.length}}</p>
    <p *ngIf="itemsToSave"> Selected : {{itemsToSave?.length}}</p>
  <mat-dialog-content>
    <app-student-select-list
    [items]="items"
    (studentsToSend)="sendResult($event)"
    >
    </app-student-select-list>
  </mat-dialog-content>
  <mat-dialog-actions>
      <button mat-button matDialogClose>Close dialog</button>
      <button mat-button matDialogClose (click)="save()">Remove Students</button>
  </mat-dialog-actions>
  `
})
export class StudentDialogListRemoveEnrolledComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<any> = new Subject();

  itemsToSave: any[];
  items: any[];
  constructor(
    public dialogRef: MatDialogRef<StudentDialogListRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ts: TeacherService) {}

    ngOnInit() {
      this.ts.findItemForObjectList('studentsEnrolledForBlock', 'studentProfile', this.data)
      .map(changes => changes
      .map(c => {
        if (c.payload.val()) {
          return Student.fromJson(c.key, {...c.payload.val()}); } }
      ))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(result => this.items = result);
    }

    save() {
      this.dialogRef.close(this.itemsToSave);
    }

    sendResult($event) {
      this.itemsToSave = $event;
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}