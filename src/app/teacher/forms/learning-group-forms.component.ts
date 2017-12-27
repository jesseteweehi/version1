import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectData } from '../../../global/models/interfaces';
import { TeacherService } from './../../models/teacher.service';

@Component({
  selector: 'app-learning-group-form',
  template: `
  <h1>{{heading}}</h1>
  <div [formGroup]="formGroup">
  <mat-input-container floatPlaceholder="auto">
      <input matInput formControlName="title"
             type="text"
             required
             placeholder="Group Title">
  </mat-input-container>
  <<mat-input-container floatPlaceholder="auto">
      <textarea matInput matTextareaAutosize formControlName="description" required
                placeholder="Group Description"></textarea>
  </mat-input-container>
  <<mat-select multiple formControlName="learningArea" placeholder="Learning Area">
      <mat-option *ngFor="let choice of learningAreas" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>
  <<mat-select multiple formControlName="learningLevel" placeholder="Learning Level">
      <mat-option *ngFor="let choice of learningLevels" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>
  <<mat-select multiple formControlName="learningTimeFrame" placeholder="Learning Time Frame">
      <mat-option *ngFor="let choice of learningTimeFrames" [value]="choice.value">
          {{choice.viewValue}}
      </mat-option>
  </mat-select>
  `,
  styles: [`
  `]
})
export class LearningGroupFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() heading: string;

  learningLevels: SelectData[];
  learningAreas: SelectData[];
  learningTimeFrames: SelectData[];

  constructor(private ts: TeacherService) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-learning-group-create-form',
  template: `
  `,
  styles: [`
  `]
})
export class LearningGroupCreateFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-learning-group-edit-form',
  template: `
  `,
  styles: [`
  `]
})
export class LearningGroupEditFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
