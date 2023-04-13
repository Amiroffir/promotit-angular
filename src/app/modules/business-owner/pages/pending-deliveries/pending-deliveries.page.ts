import { Component } from '@angular/core';
import { catchError, EMPTY, Observable, take, tap, throwError } from 'rxjs';
import { BaseManager } from 'src/app/components/base-manager/base-manager.component';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { IDelivery } from 'src/app/modules/products/models/product.model';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'pending-deliveries',
  templateUrl: './pending-deliveries.page.html',
  styleUrls: ['./pending-deliveries.page.less'],
})
export class PendingDeliveriesPage extends BaseManager {
  constructor(
    private productsData: ProductsDataService,
    private _snack: SnackbarService
  ) {
    super();
  }

  public reportType = ReportTypes.DeliveriesReport;
  public delivsList$: Observable<IDelivery[]> | null = null;

  public ngOnInit(): void {
    this._updateDelivsList(); // Get the list of pending deliveries
  }

  public updateDelivered(serialNumber: number): void {
    const updateDeliveredSub = this.productsData
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
    this.subscriptionsManager.push(updateDeliveredSub);
  }

  private _updateDelivsList(): void {
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
