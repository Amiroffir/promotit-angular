import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forEach } from 'underscore';
import { listItem } from '../../models/details-list.model';
import { IUserExtendedDetails } from '../../models/user.model';

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
    forEach(this.user, (value, key) => {
      key = this.toViewKey(key);
      this.detailsList.push({ title: key, value: value });
    });
  }

  private toViewKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
      return str.toUpperCase();
    });
  }
}
