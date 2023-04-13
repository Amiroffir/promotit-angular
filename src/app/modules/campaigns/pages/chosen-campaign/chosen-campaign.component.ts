import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, take } from 'rxjs';
import { CampaignsDataService } from '../../services/campaigns-data.service';
import { ICampaign } from '../../models/campaign.model';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Roles } from 'src/app/constants/roles.enum';
import { IProduct } from 'src/app/modules/products/models/product.model';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';

@Component({
  selector: 'chosen-campaign',
  templateUrl: './chosen-campaign.page.html',
  styleUrls: ['./chosen-campaign.page.less'],
})
export class ChosenCampaignPage extends BaseManager implements OnInit {
  public campaignDetails$: Observable<ICampaign> | null = null;
  public productsList$: Observable<IProduct[]> | null = null;
  public campaignId: string = '';
  public userRole: string = '';
  public email: string = '';

  constructor(
    private route: ActivatedRoute,
    private campaignsDataService: CampaignsDataService,
    private productsDataService: ProductsDataService,
    private auth: Auth0Service,
    private _snack: SnackbarService
  ) {
    super();
    this.campaignId = this.route.snapshot.params['id'];
    this.userRole = this.auth.role;
    this.email = this.auth.userEmail;
  }

  // Optional - simple code for retrieving the campaign details from the cache
  // public campaignDetails$: Observable<ICampaign> = this.campaignsDataService.campaignsListCached$.pipe(
  //   map((campaigns: ICampaign[]) => {
  //     return campaigns.find((campaign: ICampaign) => campaign.id === this.campaignId);
  //   })
  // );

  public ngOnInit(): void {
    this.campaignDetails$ = this.campaignsDataService
      .getCampaignById(this.campaignId)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      );
    this.getUpdatedProductsList();
  }

  public handleBuy(pid: string): void {
    this._snack.openSnackBar('Buying product...', 'Please wait');
    const handleBuySub = this.productsDataService
      .handleBuyProduct(pid, this.email)
      .pipe(
        take(1),
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe({
        next: (bought: boolean) => {
          if (bought) {
            this._snack.openSnackBar('Purchase completed!');
            this.getUpdatedProductsList();
          }
        },
      });
    this.subscriptionsManager.push(handleBuySub);
  }

  private getUpdatedProductsList(): void {
    this.productsList$ = this.productsDataService
      .getProducts(this.campaignId)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      );
  }

  public get isSocialActivist(): boolean {
    return this.userRole === Roles.SocialActivist;
  }

  public get isBusiness(): boolean {
    return this.userRole === Roles.BusinessRep;
  }
}
