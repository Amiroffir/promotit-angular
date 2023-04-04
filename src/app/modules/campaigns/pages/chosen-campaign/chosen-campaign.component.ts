import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import {
  CampaignsDataService,
  ICampaign,
} from '../../services/campaigns-data.service';

@Component({
  selector: 'chosen-campaign',
  templateUrl: './chosen-campaign.page.html',
  styleUrls: ['./chosen-campaign.page.less'],
})
export class ChosenCampaignPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private campaignsDataService: CampaignsDataService
  ) {
    this.campaignId = this.route.snapshot.params['id'];
    this.campaignDetails$ = this.campaignsDataService
      .getCampaignById(this.campaignId)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return EMPTY;
        })
      );
  }

  // This is the code for retrieving the campaign details from the cache - optional
  // public campaignDetails$: Observable<ICampaign> = this.campaignsDataService.campaignsListCached$.pipe(
  //   map((campaigns: ICampaign[]) => {
  //     return campaigns.find((campaign: ICampaign) => campaign.id === this.campaignId);
  //   })
  // );
  public campaignDetails$: Observable<ICampaign> | null = null;
  public campaignId: string = '';
  public ngOnInit(): void {
    // this.campaignId = this.route.snapshot.params['id'];
    // this.campaignDetails$ = this.campaignsDataService
    //   .getCampaignById(this.campaignId)
    //   .pipe(
    //     catchError((error: any) => {
    //       console.error(error);
    //       return EMPTY;
    //     })
    //   );
  }
}
