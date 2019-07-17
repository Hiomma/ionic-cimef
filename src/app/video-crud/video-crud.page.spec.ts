import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCrudPage } from './video-crud.page';

describe('VideoCrudPage', () => {
  let component: VideoCrudPage;
  let fixture: ComponentFixture<VideoCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCrudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
