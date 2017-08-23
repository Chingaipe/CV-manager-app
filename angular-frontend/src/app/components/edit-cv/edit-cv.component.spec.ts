/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditCVComponent } from './edit-cv.component';

describe('EditCVComponent', () => {
  let component: EditCVComponent;
  let fixture: ComponentFixture<EditCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
