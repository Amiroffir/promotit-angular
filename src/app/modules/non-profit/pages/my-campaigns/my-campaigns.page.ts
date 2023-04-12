import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, EMPTY, take, tap } from 'rxjs';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { EditCampaignDialog } from 'src/app/modules/campaigns/components/edit-campaign-dialog/edit-campaign-dialog.component';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'my-campaigns',
  templateUrl: './my-campaigns.page.html',
  styleUrls: ['./my-campaigns.page.less'],
})
export class MyCampaignsPage extends BaseManager implements OnInit {
  private _userEmail: string = '';
  public reportType: string = ReportTypes.MyCampaignsReport;
  public myCampaignsList$: Observable<ICampaign[]> | null = null;

  constructor(
    private campaignsData: CampaignsDataService,
    private auth: Auth0Service,
    private dialog: MatDialog,
    private _snack: SnackbarService
  ) {
    super();
    this._userEmail = this.auth.userEmail;
  }

  public ngOnInit(): void {
    this.myCampaignsList$ = this.campaignsData
      .getMyCampaigns(this._userEmail)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      );
  }

  public openEditDialog(campaign: ICampaign): void {
    const dialogRef = this.dialog.open(EditCampaignDialog, {
      width: '800px',
      data: campaign,
    });
    dialogRef.afterClosed().subscribe((updatedCampaign: ICampaign) => {
      this.updateCampaign(updatedCampaign);
    });
  }

  public updateCampaign(campaign: ICampaign): void {
    const updateCampaignSub = this.campaignsData
      .updateCampaign(campaign)
      .pipe(
        tap((updated: boolean) => {
          if (updated) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  this._snack.errorSnackBar(error);
                  return EMPTY;
                })
              );
            this._snack.openSnackBar('Campaign updated successfully');
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
    this.subscriptionsManager.push(updateCampaignSub);
  }

  public deleteCampaign(id: number): void {
    const deleteCampaignSub = this.campaignsData
      .deleteCampaign(id)
      .pipe(
        tap((deleted: boolean) => {
          if (deleted) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  this._snack.errorSnackBar(error);
                  return EMPTY;
                })
              );
            this._snack.openSnackBar('Campaign deleted successfully');
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
    this.subscriptionsManager.push(deleteCampaignSub);
  }
}
