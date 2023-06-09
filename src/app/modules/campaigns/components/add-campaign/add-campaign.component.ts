import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CampaignHeaders } from '../../constants/campaignForm.constant';
import { ICampaign } from '../../models/campaign.model';
import { CampaignsDataService } from '../../services/campaigns-data.service';

@Component({
  selector: 'add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.less'],
})
export class AddCampaignComponent extends BaseManager implements OnInit {
  public campaignToAdd: ICampaign = {} as ICampaign;
  public campaignHeaders = CampaignHeaders;

  constructor(
    private campaignsData: CampaignsDataService,
    private auth: Auth0Service,
    private _snack: SnackbarService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.campaignToAdd.nonProfitRepID = this.auth.userEmail;
  }

  public onAddCampaign(): void {
    if (!this.validateForm()) {
      this._snack.errorSnackBar('Please fill all the fields');
      return;
    }
    const addCampaignSub = this.campaignsData
      .createCampaign(this.campaignToAdd)
      .pipe(
        tap((isAdded: boolean) => {
          if (isAdded) {
            this.campaignToAdd = {} as ICampaign; // reset form fields after adding campaign
            this._snack.openSnackBar('Campaign Added Successfully');
            this.campaignsData.campaignsListCached$.pipe(
              take(1),
              catchError((error: Error) => {
                console.error(error);
                return EMPTY;
              })
            );
          }
        }),
        take(1),
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe();
    this.subscriptionsManager.push(addCampaignSub);
  }

  public validateForm(): boolean {
    if (
      !this.campaignToAdd.campaignName ||
      !this.campaignToAdd.campaignDesc ||
      !this.campaignToAdd.image ||
      !this.campaignToAdd.campaignHash ||
      !this.campaignToAdd.campaignUrl
    ) {
      return false;
    }
    return true;
  }
}
