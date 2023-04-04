import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable, catchError, EMPTY, take, tap } from 'rxjs';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'my-campaigns',
  templateUrl: './my-campaigns.page.html',
  styleUrls: ['./my-campaigns.page.less'],
})
export class MyCampaignsPage implements OnInit {
  private _userEmail: string = '';
  public reportType: string = 'My Campaigns';
  public myCampaignsList$: Observable<ICampaign[]> | null = null;

  constructor(
    private campaignsData: CampaignsDataService,
    private localStroage: LocalStorageService
  ) {
    this._userEmail = this.localStroage
      .get<string>('userEmail')
      .replace(/"/g, '');
  }
  public ngOnInit(): void {
    this.myCampaignsList$ = this.campaignsData
      .getMyCampaigns(this._userEmail)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return EMPTY;
        })
      );
  }

  public deleteCampaign(id: number): void {
    this.campaignsData
      .deleteCampaign(id)
      .pipe(
        tap((result: boolean) => {
          if (result) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  return EMPTY;
                })
              );
          }
        }),
        take(1),
        catchError((error: any) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
