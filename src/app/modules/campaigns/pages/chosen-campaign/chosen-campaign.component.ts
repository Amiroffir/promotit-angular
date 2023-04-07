import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable, take, tap } from 'rxjs';
import { CampaignsDataService } from '../../services/campaigns-data.service';
import { ICampaign } from '../../models/campaign.model';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';

@Component({
  selector: 'chosen-campaign',
  templateUrl: './chosen-campaign.page.html',
  styleUrls: ['./chosen-campaign.page.less'],
})
export class ChosenCampaignPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private campaignsDataService: CampaignsDataService,
    private productsDataService: ProductsDataService,
    private auth: Auth0Service,
    private _snackBar: MatSnackBar
  ) {
    this.campaignId = this.route.snapshot.params['id'];
    this.userRole = this.auth.role;
    this.email = this.auth.userEmail;
  }

  // This is the code for retrieving the campaign details from the cache - optional
  // public campaignDetails$: Observable<ICampaign> = this.campaignsDataService.campaignsListCached$.pipe(
  //   map((campaigns: ICampaign[]) => {
  //     return campaigns.find((campaign: ICampaign) => campaign.id === this.campaignId);
  //   })
  // );
  public campaignDetails$: Observable<ICampaign> | null = null;
  public productsList$: Observable<any> | null = null;
  public campaignId: string = '';
  public userRole: string = '';
  public email: string = '';
  public ngOnInit(): void {
    this.campaignDetails$ = this.campaignsDataService
      .getCampaignById(this.campaignId)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      );
    this.getUpdatedProductsList();
  }

  public handleBuy(pid: string): void {
    this.openSnackBar('Buying product...', 'Please wait');
    this.productsDataService
      .handleBuyProduct(pid, this.email)
      .pipe(
        take(1),
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.openSnackBar('Product bought successfully');
            this.getUpdatedProductsList();
          }
        },
      });
  }

  private getUpdatedProductsList(): void {
    this.productsList$ = this.productsDataService
      .getProducts(this.campaignId)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        })
      );
  }

  private openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
