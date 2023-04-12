import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'social-act-dashboard',
  templateUrl: './social-act-dashboard.page.html',
  styleUrls: ['./social-act-dashboard.page.less'],
})
export class SocialActDashboard {
  constructor(
    private router: Router,
    private campaignsData: CampaignsDataService,
    private snackbar: SnackbarService
  ) {}

  public campaignsList$ = this.campaignsData.campaignsListCached$.pipe(
    catchError((error: any, caught: Observable<ICampaign[]>) => {
      console.error(error);
      this.snackbar.errorSnackBar('Error getting campaigns');
      return EMPTY;
    })
  );

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`/social-activist/${id}`]);
  }
}
