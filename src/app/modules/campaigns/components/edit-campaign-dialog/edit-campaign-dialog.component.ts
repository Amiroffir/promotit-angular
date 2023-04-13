import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignHeaders } from '../../constants/campaignForm.constant';
import { ICampaign } from '../../models/campaign.model';

@Component({
  selector: 'edit-campaign-dialog',
  templateUrl: './edit-campaign-dialog.component.html',
  styleUrls: ['./edit-campaign-dialog.component.less'],
})
export class EditCampaignDialog {
  public campaignToUpdate: ICampaign = {} as ICampaign;
  public campaignHeaders = CampaignHeaders;

  constructor(
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: ICampaign
  ) {
    this.campaignToUpdate = data;
  }

  public validateCampaign(): boolean {
    if (
      this.campaignToUpdate.campaignName === '' ||
      this.campaignToUpdate.campaignDesc === '' ||
      this.campaignToUpdate.image === '' ||
      this.campaignToUpdate.campaignHash === ''
    ) {
      return false;
    }
    return true;
  }
}
