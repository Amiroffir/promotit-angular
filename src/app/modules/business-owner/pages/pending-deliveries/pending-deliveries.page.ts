import { Component } from '@angular/core';
import { catchError, EMPTY, Observable, take, tap, throwError } from 'rxjs';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { IDelivery } from 'src/app/modules/products/models/product.model';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'pending-deliveries',
  templateUrl: './pending-deliveries.page.html',
  styleUrls: ['./pending-deliveries.page.less'],
})
export class PendingDeliveriesPage {
  constructor(
    private productsData: ProductsDataService,
    private _snack: SnackbarService
  ) {}

  public reportType = ReportTypes.DeliveriesReport;
  public delivsList$: Observable<IDelivery[]> | null = null;

  public ngOnInit(): void {
    this._updateDelivsList();
  }

  public updateDelivered(serialNumber: number) {
    this.productsData
      .updateDelivered(serialNumber)
      .pipe(
        take(1),
        tap((updated: boolean) => {
          if (updated) {
            this._updateDelivsList();
            this._snack.openSnackBar('Delivery updated successfully');
          }
        }),
        catchError((error: any) => {
          console.error(error);
          this._snack.errorSnackBar(error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  private _updateDelivsList() {
    this.delivsList$ = this.productsData.getPendingDeliveries().pipe(
      take(1),
      catchError((error: any) => {
        console.error(error);
        this._snack.errorSnackBar(error);
        return EMPTY;
      })
    );
  }
}
