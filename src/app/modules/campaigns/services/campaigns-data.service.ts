import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import * as _ from 'underscore';
import { ICampaign } from '../models/campaign.model';

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
        return throwError(() => new Error('Error getting campaigns'));
      })
    );
  }

  public getMyCampaigns(email: string | undefined): Observable<ICampaign[]> {
    if (!email) return from([[]]);
    return this.http
      .get<Object>(`${SERVER_URL}/Campaigns/GetMyCampaigns/${email}`)
      .pipe(
        map((campaigns: Object) => {
          const myCampaigns: ICampaign[] = [];
          _.forEach(campaigns, (campaign) => {
            myCampaigns.push(this.toLocalCampaign(campaign));
          });
          return myCampaigns;
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting campaigns'));
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
          return throwError(() => new Error('Error getting campaign details'));
        })
      );
  }

  public createCampaign(campaign: ICampaign): Observable<boolean> {
    const serverCampaign: IServerCampaign = this.toServerCampaign(campaign);
    return this.http
      .post<boolean>(`${SERVER_URL}/Campaigns/Add`, serverCampaign)
      .pipe(
        tap((created: boolean) => {
          if (created) {
            this._campaignsList = null;
            this._cacheTimeStamp = null;
          }
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error creating new campaign'));
        })
      );
  }

  public updateCampaign(campaign: ICampaign): Observable<boolean> {
    const serverCampaign: IServerCampaign = this.toServerCampaign(campaign);
    return this.http
      .put<boolean>(`${SERVER_URL}/Campaigns/Update`, serverCampaign)
      .pipe(
        tap((campaign: boolean) => {
          if (campaign) {
            this._campaignsList = null;
            this._cacheTimeStamp = null;
          }
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error updating campaign'));
        })
      );
  }

  public deleteCampaign(id: number): Observable<boolean> {
    console.log('id: ', id);
    return this.http
      .delete<boolean>(`${SERVER_URL}/Campaigns/Delete/${id}`)
      .pipe(
        tap((isDeleted: boolean) => {
          if (isDeleted) {
            this._campaignsList = null;
            this._cacheTimeStamp = null;
          }
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error deleting campaign'));
        })
      );
  }

  private toServerCampaign(localCampaign: ICampaign): IServerCampaign {
    return {
      id: localCampaign.id,
      CampaignName: localCampaign.campaignName,
      CampaignDesc: localCampaign.campaignDesc,
      CampaignHash: localCampaign.campaignHash,
      CampaignUrl: localCampaign.campaignUrl,
      DonationsAmount: localCampaign.donationsAmount,
      Image: localCampaign.image,
      NonProfitRepID: localCampaign.nonProfitRepID,
    };
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
