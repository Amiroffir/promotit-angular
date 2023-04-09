import { Component } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ReportsRoutes } from '../../constants/server-routes.enum';
import { ReportTypes } from '../../enums/reportTypes.enum';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.less'],
})
export class AdminDashboard {
  constructor(
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

  public reportRoutes = ReportsRoutes;
  public reportTypes = ReportTypes;
}
