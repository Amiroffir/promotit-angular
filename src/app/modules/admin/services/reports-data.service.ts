import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import { ITweet } from '../models/tweet.model';
import { ISystemUser, IUserExtendedDetails } from '../models/user.model';

interface IServerSystemUser {
  userType: string;
  userID: number;
  fullName: string;
  email: string;
}

interface IServerUserDetailsResponse {
  id: number;
  userID: number;
  fullName: string;
  email: string;
  address: string;
  phone: string;
  earningStatus: number;
  twitterHandle: string;
  lastEarningsUpdate: string;
}

interface IServerTweet {
  handle: string;
  tweetsCount: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportsDataService {
  constructor(private http: HttpClient) {}

  public getTweetsReport(): Observable<ITweet[]> {
    return this.http
      .get<IServerTweet[]>(`${SERVER_URL}/twitter/GetTweetsReport`)
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
    return this.http.get<IServerSystemUser[]>(`${SERVER_URL}/users/Get`).pipe(
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
        `${SERVER_URL}/users/GetUserDetails/${userID}`
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
    return {
      fullName: serverUser.fullName,
      email: serverUser.email,
      address: serverUser.address,
      phone: serverUser.phone,
      earningStatus: serverUser.earningStatus,
      twitterHandle: serverUser.twitterHandle,
      lastEarningsUpdate: serverUser.lastEarningsUpdate,
    };
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
