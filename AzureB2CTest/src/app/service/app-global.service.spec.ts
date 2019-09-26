import { TestBed } from '@angular/core/testing';

import { AppGlobalService } from './app-global.service';

describe('AppGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppGlobalService = TestBed.get(AppGlobalService);
    expect(service).toBeTruthy();
  });
});
