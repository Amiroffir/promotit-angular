import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, tap, throwError } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import {
  CacheRefreshTime,
  CampaignsRoutes,
} from '../constants/server-routes.constant';
import { ICampaign, IServerCampaign } from '../models/campaign.model';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class CampaignsDataService {
  constructor(private http: HttpClient) {}

  private _cacheTimeStamp: number | null = null;
  private _campaignsList: ICampaign[] | null = null;

  public get campaignsListCached$(): Observable<ICampaign[]> {
    if (!this._campaignsList || !this.isCacheValid()) {
      return this.getCampaigns<Object>( // List of campaigns is returned as an object of objects
        `${SERVER_URL}${CampaignsRoutes.GetCampaigns}`
      ).pipe(
        tap((campaigns: Object) => {
          this._campaignsList = [];
          this._cacheTimeStamp = Date.now();

          // Convert the object of objects to an array of objects
          _.forEach(campaigns, (campaign) => {
            this._campaignsList?.push(this.toLocalCampaign(campaign));
          });
        }),
        map(() => {
          return this._campaignsList ?? [];
        }),
        catchError((error: any) => {
          console.error(error);
          return throwError(() => new Error('Error getting campaigns'));
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
      .get<Object>(`${SERVER_URL}${CampaignsRoutes.GetMyCampaigns}${email}`)
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
      .get<IServerCampaign>(
        `${SERVER_URL}${CampaignsRoutes.GetCampaignDetails}${id}`
      )
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
      .post<boolean>(
        `${SERVER_URL}${CampaignsRoutes.AddCampaign}`,
        serverCampaign
      )
      .pipe(
        tap((created: boolean) => {
          if (created) {
            // If the campaign was created successfully, clear the cache
            this.clearCache();
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
      .put<boolean>(
        `${SERVER_URL}${CampaignsRoutes.UpdateCampaign}`,
        serverCampaign
      )
      .pipe(
        tap((updated: boolean) => {
          if (updated) {
            this.clearCache();
          }
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error updating campaign'));
        })
      );
  }

  public deleteCampaign(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${SERVER_URL}${CampaignsRoutes.DeleteCampaign}${id}`)
      .pipe(
        tap((isDeleted: boolean) => {
          if (isDeleted) {
            this.clearCache();
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

  private isCacheValid(): boolean {
    if (
      // if cache is not null and cache is not expired
      this._cacheTimeStamp &&
      Date.now() - this._cacheTimeStamp < CacheRefreshTime
    ) {
      // 5 minutes in milliseconds
      return true;
    }
    return false;
  }

  private clearCache(): void {
    this._campaignsList = null;
    this._cacheTimeStamp = null;
  }
}
