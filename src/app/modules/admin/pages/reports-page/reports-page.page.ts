import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';

@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.page.html',
  styleUrls: ['./reports-page.page.less'],
})
export class ReportsPage {
  constructor(
    private route: ActivatedRoute,
    private campaignsData: CampaignsDataService
  ) {}

  public reportType: string = '';
  public reportData$: Observable<ICampaign[]> | null = null;

  public ngOnInit(): void {
    this.reportType = this.route.snapshot.params['reportType'];
    if (this.reportType === 'Campaigns') {
      this.reportData$ = this.campaignsData.campaignsListCached$.pipe(
        catchError((error: any, caught: Observable<ICampaign[]>) => {
          console.error(error);
          return EMPTY;
        })
      );
    }
  }
}
