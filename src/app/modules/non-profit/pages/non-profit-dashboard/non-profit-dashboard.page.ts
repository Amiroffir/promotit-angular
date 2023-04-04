import { Component } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';

@Component({
  selector: 'non-profit-dashboard',
  templateUrl: './non-profit-dashboard.page.html',
  styleUrls: ['./non-profit-dashboard.page.less'],
})
export class NonProfitDashboard {
  constructor(private campaignsData: CampaignsDataService) {}

  public campaignsList$: Observable<ICampaign[]> =
    this.campaignsData.campaignsListCached$.pipe(
      catchError((error: any, caught: Observable<ICampaign[]>) => {
        console.error(error);
        return EMPTY;
      })
    );
}
