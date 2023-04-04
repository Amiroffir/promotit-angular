import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, EMPTY, take, tap } from 'rxjs';
import { EditCampaignDialog } from 'src/app/modules/campaigns/components/edit-campaign-dialog/edit-campaign-dialog.component';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { CampaignsDataService } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

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
    private localStroage: LocalStorageService,
    private dialog: MatDialog
  ) {
    this._userEmail = this.localStroage
      .get<string>('userEmail')
      .replace(/"/g, '');
  }
  public ngOnInit(): void {
    this.myCampaignsList$ = this.campaignsData
      .getMyCampaigns(this._userEmail)
      .pipe(
        catchError((error: any) => {
          console.error(error);
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
      console.log(result); // Send the result to the server to update the campaign
    });
  }

  public deleteCampaign(id: number): void {
    this.campaignsData
      .deleteCampaign(id)
      .pipe(
        tap((result: boolean) => {
          if (result) {
            this.myCampaignsList$ = this.campaignsData
              .getMyCampaigns(this._userEmail)
              .pipe(
                catchError((error: any) => {
                  console.error(error);
                  return EMPTY;
                })
              );
          }
        }),
        take(1),
        catchError((error: any) => {
          console.error(error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
