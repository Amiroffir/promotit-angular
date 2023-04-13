import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, take } from 'rxjs';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { DataObservable } from 'src/app/modules/shared/constants/report-types.enum';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserDetailsDialog } from '../../components/user-details-dialog/user-details-dialog.component';
import { ReportTypes } from '../../enums/reportTypes.enum';
import { ITweet } from '../../models/tweet.model';
import { ISystemUser, IUserExtendedDetails } from '../../models/user.model';
import { ReportsDataService } from '../../services/reports-data.service';

@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.page.html',
  styleUrls: ['./reports-page.page.less'],
})
export class ReportsPage extends BaseManager {
  constructor(
    private route: ActivatedRoute,
    private campaignsData: CampaignsDataService,
    private usersData: ReportsDataService,
    private dialog: MatDialog,
    private _snack: SnackbarService
  ) {
    super();
  }

  public reportType: string = '';
  public reportData$: DataObservable | null = null;

  public ngOnInit(): void {
    this.reportType = this.route.snapshot.params['reportType'];

    switch (this.reportType) {
      case ReportTypes.CampaignsReport:
        this.reportData$ = this.campaignsData.campaignsListCached$.pipe(
          catchError((error: any, caught: Observable<ICampaign[]>) => {
            console.error(error);
            this._snack.errorSnackBar(error);
            return EMPTY;
          })
        );
        break;
      case ReportTypes.UserReport:
        this.reportData$ = this.usersData.getUsersReport().pipe(
          catchError((error: any, caught: Observable<ISystemUser[]>) => {
            console.error(error);
            this._snack.errorSnackBar(error);
            return EMPTY;
          })
        );
        break;
      case ReportTypes.TweetsReport:
        this.reportData$ = this.usersData.getTweetsReport().pipe(
          catchError((error: any, caught: Observable<ITweet[]>) => {
            console.error(error);
            this._snack.errorSnackBar(error);
            return EMPTY;
          })
        );
        break;
      default:
        break;
    }
  }

  // Get the user details and open the dialog
  public showUserDetails(userID: number): void {
    const userDetailsSub = this.usersData
      .getUserDetails(userID)
      .pipe(
        take(1),
        catchError((error: any) => {
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe((user: IUserExtendedDetails) => {
        this.openUserDetailsDialog(user);
      });
    this.subscriptionsManager.push(userDetailsSub);
  }

  public openUserDetailsDialog(user: IUserExtendedDetails): void {
    const dialogRef = this.dialog.open(UserDetailsDialog, {
      width: '800px',
      data: user,
    });
  }
}
