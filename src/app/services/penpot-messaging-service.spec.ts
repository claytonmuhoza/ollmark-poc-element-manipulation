import { TestBed } from '@angular/core/testing';

import { PenpotMessagingService } from './penpot-messaging-service';

describe('PenpotMessagingService', () => {
  let service: PenpotMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenpotMessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
