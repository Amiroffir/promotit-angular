import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { BusinessRoutes } from '../../enums/businessRoutes.enum';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'business-dashboard',
  templateUrl: './business-dashboard.page.html',
  styleUrls: ['./business-dashboard.page.less'],
})
export class BusinessDashboard {
  public routes = BusinessRoutes;

  constructor(
    private router: Router,
    private campaignsData: CampaignsDataService,
    private _snack: SnackbarService
  ) {}

  public campaignsList$: Observable<ICampaign[]> =
    this.campaignsData.campaignsListCached$.pipe(
      catchError((error: any, caught: Observable<ICampaign[]>) => {
        console.error(error);
        this._snack.errorSnackBar(error);
        return EMPTY;
      })
    );

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`${this.routes.businessOwnerPrefix}${id}`]);
  }
}
