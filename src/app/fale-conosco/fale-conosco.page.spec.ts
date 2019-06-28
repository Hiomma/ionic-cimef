import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaleConoscoPage } from './fale-conosco.page';

describe('FaleConoscoPage', () => {
  let component: FaleConoscoPage;
  let fixture: ComponentFixture<FaleConoscoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaleConoscoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaleConoscoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
