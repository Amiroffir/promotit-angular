import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.less'],
})
export class WalletComponent implements OnInit {
  constructor(
    private productsData: ProductsDataService,
    private auth: Auth0Service
  ) {}

  public walletAmount$: Observable<number> | null = null;

  public ngOnInit(): void {
    this.walletAmount$ = this.productsData.wallet$;
  }
}
