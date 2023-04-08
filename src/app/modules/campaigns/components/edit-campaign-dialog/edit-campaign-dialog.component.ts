import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICampaign } from '../../models/campaign.model';

@Component({
  selector: 'edit-campaign-dialog',
  templateUrl: './edit-campaign-dialog.component.html',
  styleUrls: ['./edit-campaign-dialog.component.less'],
})
export class EditCampaignDialog {
  public campaignToUpdate: ICampaign = {} as ICampaign;
  constructor(
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: ICampaign
  ) {
    this.campaignToUpdate = data;
  }
}
