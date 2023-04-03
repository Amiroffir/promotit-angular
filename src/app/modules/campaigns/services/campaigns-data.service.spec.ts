import { TestBed } from '@angular/core/testing';

import { CampaignsDataService } from './campaigns-data.service';

describe('CampaignsDataService', () => {
  let service: CampaignsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
