import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, take, tap } from 'rxjs';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
    private _snackBar: SnackbarService
  ) {}

  public addToProductsList(): void {
    if (!this.validateProduct()) {
      this._snackBar.openSnackBar('Please fill all the fields');
      return;
    }
    this.product.sysId = Math.random().toString(36).substring(2, 15);
    this.productsToDonate.push(this.product);
    this.product = {} as IProduct; // reset product
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
            this._snackBar.openSnackBar('Products donated successfully');
          }
        }),
        catchError((error: any) => {
          console.error(error);
          this._snackBar.errorSnackBar(error);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
  }

  private validateProduct(): boolean {
    if (
      !this.product.productName ||
      !this.product.productId ||
      !this.product.price ||
      !this.product.image
    ) {
      return false;
    }
    return true;
  }
}
