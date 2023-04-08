import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, take, tap } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { UserDetailsDialog } from '../../components/user-details-dialog/user-details-dialog.component';
import { ITweet } from '../../models/tweet.model';
import { ISystemUser, IUserExtendedDetails } from '../../models/user.model';
import { ReportsDataService } from '../../services/reports-data.service';

@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.page.html',
  styleUrls: ['./reports-page.page.less'],
})
export class ReportsPage {
  constructor(
    private route: ActivatedRoute,
    private campaignsData: CampaignsDataService,
    private usersData: ReportsDataService,
    private dialog: MatDialog
  ) {}

  public reportType: string = '';
  public reportData$: Observable<
    ICampaign[] | ISystemUser[] | ITweet[]
  > | null = null;

  public ngOnInit(): void {
    this.reportType = this.route.snapshot.params['reportType'];
    if (this.reportType === 'Campaigns') {
      this.reportData$ = this.campaignsData.campaignsListCached$.pipe(
        catchError((error: Error, caught: Observable<ICampaign[]>) => {
          console.error(error);
          return EMPTY;
        })
      );
    }
    if (this.reportType === 'Users') {
      this.reportData$ = this.usersData.getUsersReport().pipe(
        catchError((error: Error, caught: Observable<ISystemUser[]>) => {
          console.error(error);
          return EMPTY;
        })
      );
    }
    if (this.reportType === 'Tweets') {
      this.reportData$ = this.usersData.getTweetsReport().pipe(
        catchError((error: Error, caught: Observable<ITweet[]>) => {
          console.error(error);
          return EMPTY;
        })
      );
    }
  }

  public showUserDetails(userID: number): void {
    this.usersData
      .getUserDetails(userID)
      .pipe(take(1))
      .subscribe((user: IUserExtendedDetails) => {
        this.openUserDetailsDialog(user);
      });
  }

  public openUserDetailsDialog(user: any): void {
    const dialogRef = this.dialog.open(UserDetailsDialog, {
      width: '800px',
      data: user,
    });
  }
}
