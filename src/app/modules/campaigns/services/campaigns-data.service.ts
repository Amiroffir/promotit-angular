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

  private _cacheTimeStamp: number | null = null;
  private _campaignsList: ICampaign[] | null = null;
  private isCacheValid(): boolean {
    if (this._cacheTimeStamp && Date.now() - this._cacheTimeStamp < 300000) {
      // 5 minutes in milliseconds
      return true;
    }
    return false;
  }

  public get campaignsListCached$(): Observable<ICampaign[]> {
    if (!this._campaignsList || !this.isCacheValid()) {
      return this.getCampaigns<Object>(`${SERVER_URL}/Campaigns/Get`).pipe(
        tap((campaigns: Object) => {
          this._campaignsList = [];
          this._cacheTimeStamp = Date.now();
          _.forEach(campaigns, (campaign) => {
            this._campaignsList?.push(this.toLocalCampaign(campaign));
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

  public getCampaignById(id: string): Observable<ICampaign> {
    return this.http
      .get<IServerCampaign>(`${SERVER_URL}/Campaigns/GetCampaignDetails/${id}`)
      .pipe(
        map((campaign: IServerCampaign) => this.toLocalCampaign(campaign)),
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
