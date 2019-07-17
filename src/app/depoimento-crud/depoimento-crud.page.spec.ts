import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoimentoCrudPage } from './depoimento-crud.page';

describe('DepoimentoCrudPage', () => {
  let component: DepoimentoCrudPage;
  let fixture: ComponentFixture<DepoimentoCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepoimentoCrudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoimentoCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
