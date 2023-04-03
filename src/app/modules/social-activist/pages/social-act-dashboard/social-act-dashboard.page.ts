import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import {
  CampaignsDataService,
  ICampaign,
} from 'src/app/modules/campaigns/services/campaigns-data.service';

@Component({
  selector: 'social-act-dashboard',
  templateUrl: './social-act-dashboard.page.html',
  styleUrls: ['./social-act-dashboard.page.less'],
})
export class SocialActDashboard {
  constructor(
    private router: Router,
    private campaignsData: CampaignsDataService
  ) {}

  public campaignsList$ = this.campaignsData.campaignsListCached$.pipe(
    catchError((error: any, caught: Observable<ICampaign[]>) => {
      console.error(error);
      return EMPTY;
    })
  );

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`/social-activist/${id}`]);
  }
}
