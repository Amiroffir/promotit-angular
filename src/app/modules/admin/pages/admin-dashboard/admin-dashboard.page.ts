import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import {
  CampaignsDataService,
  ICampaign,
} from 'src/app/modules/campaigns/services/campaigns-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { ReportTypes } from '../../enums/reportTypes.enum';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.less'],
})
export class AdminDashboard implements OnInit {
  constructor(
    private auth: Auth0Service,
    private campaignsData: CampaignsDataService
  ) {}
  public campaignsList$: Observable<ICampaign[]> =
    this.campaignsData.campaignsListCached$.pipe(
      catchError((error: any, caught: Observable<ICampaign[]>) => {
        console.error(error);
        return EMPTY;
      })
    );

  public reportTypes = ReportTypes;

  public ngOnInit(): void {
    console.log('it returns to the admin dashboard');
  }
  public logout(): void {
    this.auth.logout();
  }
}
