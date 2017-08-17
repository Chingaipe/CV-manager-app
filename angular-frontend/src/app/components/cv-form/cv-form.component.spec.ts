/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CvFormComponent } from './cv-form.component';

describe('CvFormComponent', () => {
  let component: CvFormComponent;
  let fixture: ComponentFixture<CvFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
