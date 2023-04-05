import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { ICampaign } from '../../models/campaign.model';
import { CampaignsDataService } from '../../services/campaigns-data.service';

@Component({
  selector: 'add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.less'],
})
export class AddCampaignComponent implements OnInit {
  public campaignToAdd: ICampaign = {} as ICampaign;
  constructor(
    private campaignsData: CampaignsDataService,
    private auth: Auth0Service
  ) {}

  public ngOnInit(): void {
    this.campaignToAdd.nonProfitRepID = this.auth.userEmail;
  }

  public onAddCampaign(): void {
    console.log(this.campaignToAdd);
    this.campaignsData
      .createCampaign(this.campaignToAdd)
      .pipe(
        tap((isAdded: boolean) => {
          if (isAdded) {
            this.campaignToAdd = {} as ICampaign;
            this.campaignsData.campaignsListCached$.pipe(
              take(1),
              tap((campaigns: ICampaign[]) => {
                console.log(campaigns);
              }),
              catchError((error: Error) => {
                console.error(error);
                return EMPTY;
              })
            );
          }
        }),
        take(1),
        catchError((error: Error) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
