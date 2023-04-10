import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import { ReportsRoutes } from '../constants/server-routes.enum';
import { IServerTweet, ITweet } from '../models/tweet.model';
import {
  IServerSystemUser,
  IServerUserDetailsResponse,
  ISystemUser,
  IUserExtendedDetails,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsDataService {
  constructor(private http: HttpClient) {}

  public getTweetsReport(): Observable<ITweet[]> {
    return this.http
      .get<IServerTweet[]>(`${SERVER_URL}${ReportsRoutes.GetTweetsReport}`)
      .pipe(
        map((tweets: IServerTweet[]) => {
          return tweets.map((tweet: IServerTweet) => this.toLocalTweet(tweet));
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting tweets report'));
        })
      );
  }

  public getUsersReport(): Observable<ISystemUser[]> {
    return this.http
      .get<IServerSystemUser[]>(`${SERVER_URL}${ReportsRoutes.GetUsersReport}`)
      .pipe(
        map((users: IServerSystemUser[]) => {
          return users.map((user: IServerSystemUser) =>
            this.toLocalSystemUser(user)
          );
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting users report'));
        })
      );
  }

  public getUserDetails(userID: number): Observable<IUserExtendedDetails> {
    return this.http
      .get<IServerUserDetailsResponse[]>(
        `${SERVER_URL}${ReportsRoutes.GetUserDetails}${userID}`
      )
      .pipe(
        map((user: IServerUserDetailsResponse[]) => {
          return this.toUserExtendedDetails(user[0]);
        }),
        catchError((error: Error) => {
          console.error(error);
          return throwError(() => new Error('Error getting user details'));
        })
      );
  }

  private toLocalTweet(serverTweet: IServerTweet): ITweet {
    return {
      handle: serverTweet.handle,
      tweetsCount: serverTweet.tweetsCount,
      type: serverTweet.type,
    };
  }

  private toUserExtendedDetails(
    serverUser: IServerUserDetailsResponse
  ): IUserExtendedDetails {
    const user: IUserExtendedDetails = {
      fullName: serverUser.fullName,
      email: serverUser.email,
    };
    if (serverUser.earningStatus) {
      user.earningStatus = serverUser.earningStatus;
      user.lastEarningsUpdate = serverUser.lastEarningsUpdate;
      user.twitterHandle = serverUser.twitterHandle;
      user.phone = serverUser.phone;
      user.address = serverUser.address;
    } else if (serverUser.companyName) {
      user.companyName = serverUser.companyName;
    } else if (serverUser.organizationName) {
      user.organizationName = serverUser.organizationName;
      user.organizationUrl = serverUser.organizationUrl;
    }
    return user;
  }

  private toLocalSystemUser(serverUser: IServerSystemUser): ISystemUser {
    return {
      userType: serverUser.userType,
      userID: serverUser.userID,
      fullName: serverUser.fullName,
      email: serverUser.email,
    };
  }
}
