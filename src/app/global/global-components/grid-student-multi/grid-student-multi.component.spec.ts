/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridStudentMultiComponent } from './grid-student-multi.component';

describe('GridStudentMultiComponent', () => {
  let component: GridStudentMultiComponent;
  let fixture: ComponentFixture<GridStudentMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridStudentMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStudentMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
