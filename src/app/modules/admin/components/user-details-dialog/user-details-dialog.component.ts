import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserExtendedDetails } from '../../models/user.model';

interface listItem {
  title: string;
  value: string;
}

@Component({
  selector: 'user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.less'],
})
export class UserDetailsDialog {
  public user: IUserExtendedDetails;
  public detailsList: listItem[] = [];
  constructor(
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: IUserExtendedDetails
  ) {
    this.user = data;
    this.init();
  }

  public init() {
    this.detailsList = [
      { title: 'Email', value: this.user.email },
      { title: 'Address', value: this.user.address },
      { title: 'Phone', value: this.user.phone },
      { title: 'Twitter Handle', value: this.user.twitterHandle },
      { title: 'Earning Status', value: this.user.earningStatus.toString() },
      { title: 'Last Earnings Update', value: this.user.lastEarningsUpdate },
    ];
  }
}
