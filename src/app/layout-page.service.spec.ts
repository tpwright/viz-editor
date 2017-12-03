import { TestBed, inject } from '@angular/core/testing';

import { LayoutPageService } from './layout-page.service';

describe('LayoutPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutPageService]
    });
  });

  it('should be created', inject([LayoutPageService], (service: LayoutPageService) => {
    expect(service).toBeTruthy();
  }));
});
