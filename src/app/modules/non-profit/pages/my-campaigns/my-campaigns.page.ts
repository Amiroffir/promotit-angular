import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, EMPTY, take, tap } from 'rxjs';
import { EditCampaignDialog } from 'src/app/modules/campaigns/components/edit-campaign-dialog/edit-campaign-dialog.component';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';

@Component({
  selector: 'my-campaigns',
  templateUrl: './my-campaigns.page.html',
  styleUrls: ['./my-campaigns.page.less'],
})
export class MyCampaignsPage implements OnInit {
  private _userEmail: string = '';
  public reportType: string = 'My Campaigns';
  public myCampaignsList$: Observable<ICampaign[]> | null = null;

  constructor(
    private campaignsData: CampaignsDataService,
    private auth: Auth0Service,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this._userEmail = this.auth.userEmail;
  }
  public ngOnInit(): void {
    this.myCampaignsList$ = this.campaignsData
      .getMyCampaigns(this._userEmail)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      );
  }

  public openEditDialog(campaign: ICampaign): void {
    const dialogRef = this.dialog.open(EditCampaignDialog, {
      width: '800px',
      data: campaign,
    });
    dialogRef.afterClosed().subscribe((result: ICampaign) => {
      if (result) {
        this.updateCampaign(result);
      }
    });
  }

  private openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  public updateCampaign(campaign: ICampaign): void {
    this.campaignsData
      .updateCampaign(campaign)
      .pipe(
        tap((updated: boolean) => {
          if (updated) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  this.openSnackBar(error);
                  return EMPTY;
                })
              );
            this.openSnackBar('Campaign updated successfully');
          }
        }),
        take(1),
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  public deleteCampaign(id: number): void {
    this.campaignsData
      .deleteCampaign(id)
      .pipe(
        tap((deleted: boolean) => {
          if (deleted) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  this.openSnackBar(error);
                  return EMPTY;
                })
              );
            this.openSnackBar('Campaign deleted successfully');
          }
        }),
        take(1),
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
