import { TestBed } from '@angular/core/testing';

import { GraphQlService } from './graph-ql.service';

describe('GraphQlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphQlService = TestBed.get(GraphQlService);
    expect(service).toBeTruthy();
  });
});
