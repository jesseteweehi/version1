/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CohortsCreateListComponent } from './cohorts-create-list.component';

describe('CohortsCreateListComponent', () => {
  let component: CohortsCreateListComponent;
  let fixture: ComponentFixture<CohortsCreateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CohortsCreateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortsCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
