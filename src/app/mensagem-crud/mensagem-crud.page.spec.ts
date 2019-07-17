import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemCrudPage } from './mensagem-crud.page';

describe('MensagemCrudPage', () => {
  let component: MensagemCrudPage;
  let fixture: ComponentFixture<MensagemCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemCrudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
