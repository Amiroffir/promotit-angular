import { Component } from '@angular/core';
import { Observable, catchError, EMPTY } from 'rxjs';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NonProfitRoutes } from '../../enums/nonProfitRoutes.enum';

@Component({
  selector: 'non-profit-dashboard',
  templateUrl: './non-profit-dashboard.page.html',
  styleUrls: ['./non-profit-dashboard.page.less'],
})
export class NonProfitDashboard {
  public routes = NonProfitRoutes;

  constructor(
    private campaignsData: CampaignsDataService,
    private _snack: SnackbarService
  ) {}

  public campaignsList$: Observable<ICampaign[]> =
    this.campaignsData.campaignsListCached$.pipe(
      catchError((error: any, caught: Observable<ICampaign[]>) => {
        this._snack.errorSnackBar(error);
        return EMPTY;
      })
    );
}
