import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  map,
  Observable,
  Subject,
  take,
  tap,
  throwError,
} from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import { Auth0Service } from '../../UserAuth/services/auth0.service';
import { IDelivery, IProduct } from '../models/product.model';

interface IServerDelivery {
  ProductSerialNumber: number;
  PID: number;
  FullName: string;
  Email: string;
  Address: string;
  Phone: string;
}

interface IServerProduct {
  id: number;
  productID: number;
  productName: string;
  price: number;
  donatedBy: number;
  donatedTo: number;
  isBought: boolean;
  buyerID: number | null;
  isDelivered: boolean;
  image: string;
}

interface IProductToBuyRequest {
  id: string;
  email: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  constructor(private http: HttpClient, private auth: Auth0Service) {
    if (this.auth.role === 'Social Activist') {
      this.getWalletAmount().subscribe((amount: number) => {
        this.walletSubject.next(amount);
      });
    }
  }
  private _productsList: IProduct[] = []; // local list of products for data extract before sending to server.

  public walletSubject = new Subject<number>();
  public wallet$ = this.walletSubject.asObservable();

  public getProducts(campaignId: string): Observable<IProduct[]> {
    if (!campaignId || campaignId === '0' || campaignId.length < 1) {
      console.error('campaignId is not valid');
    }
    return this.http
      .get<IServerProduct[]>(`${SERVER_URL}/Products/Get/${campaignId}`)
      .pipe(
        map((products: IServerProduct[]) => {
          return products.map((product: IServerProduct) => {
            return this.toLocalProduct(product);
          });
        }),
        tap((products: IProduct[]) => {
          this._productsList = products;
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting products'));
        })
      );
  }

  public addDonatedProducts(products: IProduct[]): Observable<boolean> {
    if (!products || products.length < 1) {
      console.error('products is not valid');
    }
    return this.http.post<boolean>(`${SERVER_URL}/Products/Add`, products).pipe(
      catchError((error: Error) => {
        console.error(error);
        return throwError(() => new Error('Error adding products'));
      })
    );
  }

  public handleBuyProduct(
    productId: string,
    email: string
  ): Observable<boolean> {
    if (!productId || productId.length < 1 || productId === '0') {
      console.error('productId is not valid');
    }
    const productToBuy: IProductToBuyRequest = {
      id: productId,
      email: email,
      price:
        this._productsList.find(
          (product: IProduct) => product.id.toString() === productId
        )?.price || 0,
    };
    return this.getWalletAmount().pipe(
      take(1),
      concatMap((amount: number) => {
        // switchMap is used to cancel the previous request if a new one is made. This is useful to return the latest observable in case of multiple requests. also it cancels the previous request every emission, even if the observables isn't completed.

        // concatMap is used to wait for the previous request to complete before making a new one. This is useful to return the observable in the order of the requests.
        if (amount < productToBuy.price) {
          console.error('Not enough money in wallet');
          return throwError(() => new Error('Not enough money in wallet'));
        } else {
          this.walletSubject.next(amount - productToBuy.price);
          return this.updateWalletAmount(productToBuy).pipe(
            catchError((error: any) => {
              console.error(error);
              return throwError(() => new Error(error));
            })
          );
        }
      }),
      concatMap((updated: boolean) => {
        if (!updated) {
          return throwError(() => new Error('Error buying product'));
        }
        return this.updateBoughtProduct(productToBuy).pipe(
          catchError((error: any) => {
            console.error(error);
            return throwError(() => new Error(error));
          })
        );
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => new Error('Error getting wallet amount'));
      })
    );
  }

  private updateBoughtProduct(
    productReq: IProductToBuyRequest
  ): Observable<boolean> {
    return this.http
      .put<boolean>(
        `${SERVER_URL}/Products/UpdateBought/${productReq.id}`,
        productReq.email
      )
      .pipe(
        tap((updated: boolean) => {
          console.log(updated);
        }),
        take(1),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error buying product'));
        })
      );
  }

  private updateWalletAmount(
    productReq: IProductToBuyRequest
  ): Observable<boolean> {
    return this.http
      .put<boolean>(
        `${SERVER_URL}/SocialActivists/UpdateWallet/${productReq.price}`,
        productReq.email
      )
      .pipe(
        tap((updated: boolean) => {
          console.log(updated);
        }),
        take(1),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error buying product'));
        })
      );
  }

  public getWalletAmount(): Observable<number> {
    const email = this.auth.userEmail;
    if (!email || email.length < 1) {
      console.error('email is not valid');
    }
    return this.http
      .get<number>(`${SERVER_URL}/SocialActivists/GetWallet/${email}`)
      .pipe(
        tap((amount: number) => {
          console.log(amount);
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting wallet amount'));
        })
      );
  }

  public getPendingDeliveries(): Observable<any> {
    const email = this.auth.userEmail;
    if (!email || email.length < 1) {
      console.error('email is not valid');
    }
    return this.http
      .get<IServerDelivery[]>(
        `${SERVER_URL}/BusinessReps/GetDeliveries/${email}`
      )
      .pipe(
        map((deliveries: IServerDelivery[]) => {
          return deliveries.map((delivery: IServerDelivery) => {
            return this.toLocalDelivery(delivery);
          });
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(
            () => new Error('Error getting pending deliveries')
          );
        })
      );
  }

  updateDelivered(serialNumber: number) {
    return this.http
      .put<boolean>(
        `${SERVER_URL}/BusinessReps/UpdateDelivered/${serialNumber}`,
        ''
      )
      .pipe(
        tap((updated: boolean) => {
          console.log(updated);
        }),
        take(1),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error updating delivery'));
        })
      );
  }

  private toLocalDelivery(delivery: IServerDelivery): IDelivery {
    return {
      serialNumber: delivery.ProductSerialNumber,
      pid: delivery.PID,
      fullName: delivery.FullName,
      email: delivery.Email,
      address: delivery.Address,
      phone: delivery.Phone,
    };
  }

  private toLocalProduct(product: IServerProduct): IProduct {
    return {
      id: product.id,
      productId: product.productID,
      sysId: '',
      productName: product.productName,
      price: product.price,
      donatedBy: '',
      donatedTo: '',
      isBought: product.isBought,
      buyerID: product.buyerID,
      isDelivered: product.isDelivered,
      image: product.image,
    };
  }
}
