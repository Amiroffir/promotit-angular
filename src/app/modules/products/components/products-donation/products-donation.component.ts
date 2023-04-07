import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { IProduct } from '../../models/product.model';
import { ProductsDataService } from '../../services/products-data.service';

@Component({
  selector: 'products-donation',
  templateUrl: './products-donation.component.html',
  styleUrls: ['./products-donation.component.less'],
})
export class ProductsDonationComponent {
  public product: IProduct = {} as IProduct;
  public productsToDonate: IProduct[] = [];
  constructor(
    private auth: Auth0Service,
    private route: ActivatedRoute,
    private productsData: ProductsDataService,
    private _snackBar: MatSnackBar
  ) {}

  public addToProductsList(): void {
    this.product.sysId = Math.random().toString(36).substring(2, 15);
    this.productsToDonate.push(this.product);
    this.product = {} as IProduct;
  }

  public removeFromProductsList(sysId: string): void {
    this.productsToDonate = this.productsToDonate.filter(
      (product: IProduct) => product.sysId !== sysId
    );
  }

  public donateProducts(): void {
    this.productsToDonate.forEach((product: IProduct) => {
      product.donatedBy = this.auth.userEmail;
      product.donatedTo = this.route.snapshot.params['id'];
    });
    this.productsData
      .addDonatedProducts(this.productsToDonate)
      .pipe(
        tap((isAdded: boolean) => {
          if (isAdded) {
            this.productsToDonate = [];
            this.openSnackBar('Products donated successfully');
          }
        }),
        catchError((error: any) => {
          console.error(error);
          this.openSnackBar(error);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
  }

  private openSnackBar(message: string, action?: string): void {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
