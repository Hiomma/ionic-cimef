import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicaoPage } from './posicao.page';

describe('PosicaoPage', () => {
  let component: PosicaoPage;
  let fixture: ComponentFixture<PosicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosicaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
