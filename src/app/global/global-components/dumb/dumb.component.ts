import { async } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dumb-card',
  template: `
  {{ viewInformation }}
  <mat-card>
    <mat-card-header>
        <mat-card-subtitle fxLayout="row" fxAlign="start">
          <mat-icon *ngIf="viewInformation.locked">lock</mat-icon>
          <mat-icon *ngIf="!viewInformation.locked">lock_open</mat-icon>
        </mat-card-subtitle>
        <mat-card-title fxLayout="row">
          <div *ngIf="viewInformation.title">{{viewInformation.title}}</div>
          <button *ngIf="haveMenu" mat-icon-button [matMenuTriggerFor]="appMenu">
              <mat-icon class="mat-18">more_vert</mat-icon>
          </button>
        </mat-card-title>
    </mat-card-header>
    <img *ngIf="viewInformation.imageUrl" matCardImage src="{{viewInformation.imageUrl}}">
    <mat-card-content *ngIf="viewInformation.description">
      {{viewInformation.description}}
    </mat-card-content>
    <mat-card-actions *ngIf="haveLinks" align="start">
        <a *ngFor="let link of Links" routerLink="{{link.url}}" mat-button>{{link.view}}</a>
    </mat-card-actions>
    <mat-card-footer>
    </mat-card-footer>
    <mat-menu #appMenu="matMenu">
      <button *ngIf="menuDetails.edit" mat-menu-item (click)="edit()">
      <mat-icon>mode_edit</mat-icon><span>{{menuDetails.edit}}</span>
      </button>
      <button *ngIf="menuDetails.delete" mat-menu-item (click)="delete()">
      <mat-icon>mode_delete</mat-icon><span>{{menuDetails.delete}}</span>
      </button>
      <button *ngIf="menuDetails.lock" mat-menu-item (click)="lock()">
      <mat-icon>lock</mat-icon><span>{{menuDetails.lock}}</span>
      </button>
    </mat-menu>
  </mat-card>
  `
  ,
  styles: [`
  `]
})

export class DumbCardComponent {

  @Input() item: any;
  @Input() key: string;
  @Input() viewInformation: any;

  @Input() haveLinks: boolean;
  @Input() links: any;

  @Input() haveMenu: boolean;
  @Input() menuDetails: any;

  @Output() editEmitter  = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() lockEmitter = new EventEmitter();

  constructor() {}

  edit() {
    this.editEmitter.emit(this.key);
  }
  delete() {
    this.deleteEmitter.emit(this.key);
  }
  lock() {
    this.lockEmitter.emit(this.key);
  }
}


