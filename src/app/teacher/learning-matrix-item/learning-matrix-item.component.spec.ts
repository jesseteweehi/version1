/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearningMatrixItemComponent } from './learning-matrix-item.component';

describe('LearningMatrixItemComponent', () => {
  let component: LearningMatrixItemComponent;
  let fixture: ComponentFixture<LearningMatrixItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningMatrixItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningMatrixItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
