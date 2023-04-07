import { Component } from '@angular/core';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { ProductsDataService } from 'src/app/modules/products/services/products-data.service';

@Component({
  selector: 'pending-deliveries',
  templateUrl: './pending-deliveries.page.html',
  styleUrls: ['./pending-deliveries.page.less'],
})
export class PendingDeliveriesPage {
  constructor(private productsData: ProductsDataService) {}

  public delivsList$: Observable<any> | null = null;

  public ngOnInit(): void {
    this.delivsList$ = this.productsData.getPendingDeliveries();
  }

  public updateDelivered(serialNumber: number) {
    this.productsData
      .updateDelivered(serialNumber)
      .pipe(
        take(1),
        tap((updated: boolean) => {
          if (updated) {
            this.delivsList$ = this.productsData.getPendingDeliveries();
          }
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe((updated) => {
        console.log(updated);
      });
  }
}
