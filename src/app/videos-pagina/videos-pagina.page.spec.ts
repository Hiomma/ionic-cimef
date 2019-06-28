import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPaginaPage } from './videos-pagina.page';

describe('VideosPaginaPage', () => {
  let component: VideosPaginaPage;
  let fixture: ComponentFixture<VideosPaginaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosPaginaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
