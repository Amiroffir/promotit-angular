import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { forEach } from 'underscore';
import { listItem } from '../../models/details-list.model';
import { IUserExtendedDetails } from '../../models/user.model';
import { MatListModule } from '@angular/material/list';

// This component is example to stand alone component that can be used in any module in the app.
// and imports only the modules that it needs. it can import other components directly if they are stand alone components too.

@Component({
  selector: 'user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatListModule], // an existing module is imported directly into a standalone component
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
    // For example: 'firstName' -> 'First Name'
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => {
      return str.toUpperCase();
    });
  }
}
