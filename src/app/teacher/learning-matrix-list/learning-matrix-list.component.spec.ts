/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearningMatrixListComponent } from './learning-matrix-list.component';

describe('LearningMatrixListComponent', () => {
  let component: LearningMatrixListComponent;
  let fixture: ComponentFixture<LearningMatrixListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMatrixListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningMatrixListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
