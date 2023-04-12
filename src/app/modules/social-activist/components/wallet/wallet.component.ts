import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less'],
})
export class WalletComponent extends BaseManager implements OnInit {
  constructor(
    private productsData: ProductsDataService,
    private auth: Auth0Service
  ) {
    super();
  }

  public walletAmount$: Observable<number> | null = this.productsData.wallet$;

  public ngOnInit(): void {
    this.walletAmount$ = this.productsData.wallet$;
  }

  public refreshWallet(): void {
    const refreshWalletSub = this.productsData.getWalletAmount().subscribe();
    this.subscriptionsManager.push(refreshWalletSub);
  }
}
