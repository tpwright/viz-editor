import { TestBed, inject } from '@angular/core/testing';

import { StatusItemService } from './status-item.service';

describe('StatusItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusItemService]
    });
  });

  it('should be created', inject([StatusItemService], (service: StatusItemService) => {
    expect(service).toBeTruthy();
  }));
});
