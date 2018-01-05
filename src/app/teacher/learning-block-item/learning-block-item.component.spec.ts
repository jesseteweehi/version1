/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearningBlockItemComponent } from './learning-block-item.component';

describe('LearningBlockItemComponent', () => {
  let component: LearningBlockItemComponent;
  let fixture: ComponentFixture<LearningBlockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningBlockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningBlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
