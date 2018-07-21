import { TestBed, inject } from '@angular/core/testing';

import { ShirtService } from './shirt.service';

describe('ShirtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShirtService]
    });
  });

  it('should be created', inject([ShirtService], (service: ShirtService) => {
    expect(service).toBeTruthy();
  }));
});
