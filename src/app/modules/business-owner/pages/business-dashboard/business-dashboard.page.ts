import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';

@Component({
  selector: 'business-dashboard',
  templateUrl: './business-dashboard.page.html',
  styleUrls: ['./business-dashboard.page.less'],
})
export class BusinessDashboard {
  constructor(
    private auth: Auth0Service,
    private router: Router,
    private campaignsData: CampaignsDataService
  ) {}

  public campaignsList$: Observable<ICampaign[]> =
    this.campaignsData.campaignsListCached$.pipe(
      catchError((error: any, caught: Observable<ICampaign[]>) => {
        console.error(error);
        return EMPTY;
      })
    );

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`/business-owner/${id}`]);
  }

  public logout(): void {
    this.auth.logout();
  }
}
