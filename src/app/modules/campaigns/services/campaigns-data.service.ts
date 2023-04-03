import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import * as _ from 'underscore';

// interface IBoardTypesReactiveService {
//   boardTypes$: Observable<IBoardType[]>;
//   boardTypesCached$: Observable<IBoardType[]>;
// }

// TODO: add caching clear every 5 minutes or every Create/Update/Delete action
// TODO: Refactor the interfaces

interface IServerCampaign {
  id: number;
  CampaignName: string;
  CampaignDesc: string;
  CampaignHash: string;
  CampaignUrl: string;
  DonationsAmount: number;
  Image: string;
  NonProfitRepID: string;
}

export interface ICampaign {
  id: number;
  campaignName: string;
  campaignDesc: string;
  campaignHash: string;
  campaignUrl: string;
  donationsAmount: number;
  image: string;
  nonProfitRepID: string;
}

@Injectable({
  providedIn: 'root',
})
export class CampaignsDataService {
  constructor(private http: HttpClient) {}

  // public campaignsList$: Observable<ICampaign[]> =
  //   this.getCampaigns<ICampaignsResponse>(`${SERVER_URL}/Campaigns/Get`).pipe(
  //     map((response: ICampaignsResponse) => {
  //       return response.campaigns.map((serverCampaign: IServerCampaign) => {
  //         return this.toLocalCampaign(serverCampaign);
  //       });
  //     })
  //   );

  private _campaignsList: ICampaign[] | null = null;

  public get campaignsListCached$(): Observable<ICampaign[]> {
    if (!this._campaignsList) {
      return this.getCampaigns<Object>(`${SERVER_URL}/Campaigns/Get`).pipe(
        tap((response: Object) => {
          this._campaignsList = [];
          _.forEach(response, (val) => {
            this._campaignsList?.push(this.toLocalCampaign(val));
          });
        }),
        map(() => {
          console.log('this._campaignsList: ', this._campaignsList);
          return this._campaignsList ?? [];
        }),
        catchError((error: any) => {
          console.error(error);
          return []; // return an empty array as a default value
        })
      );
    } else {
      return from([this._campaignsList]);
    }
  }
  public getCampaigns<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError((error: Error) => {
        console.error(error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  private toLocalCampaign(serverCampaign: IServerCampaign): ICampaign {
    return {
      id: serverCampaign.id,
      campaignName: serverCampaign.CampaignName,
      campaignDesc: serverCampaign.CampaignDesc,
      campaignHash: serverCampaign.CampaignHash,
      campaignUrl: serverCampaign.CampaignUrl,
      donationsAmount: serverCampaign.DonationsAmount,
      image: serverCampaign.Image,
      nonProfitRepID: serverCampaign.NonProfitRepID,
    };
  }
}
