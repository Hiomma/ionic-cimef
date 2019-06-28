import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoimentosPaginaPage } from './depoimentos-pagina.page';

describe('DepoimentosPaginaPage', () => {
  let component: DepoimentosPaginaPage;
  let fixture: ComponentFixture<DepoimentosPaginaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepoimentosPaginaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoimentosPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
