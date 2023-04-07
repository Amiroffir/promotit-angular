import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  take,
  throwError,
} from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import { AuthService, User } from '@auth0/auth0-angular';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

export interface Role {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private localStorage: LocalStorageService
  ) {
    this.handleAuthUser();
    let user: string[] = localStorage.get<string[]>('user');
    if (user.length > 0) {
      this._isAuthenticated = true;
      this._userEmail = localStorage.get<string>('userEmail');
      this._role = localStorage.get<string>('userRole');
    }
  }

  private _isAuthenticated: boolean = false;
  private _role: string = '';
  private _userEmail: string = '';
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public get role(): string {
    return this._role.replace(/"/g, '');
  }

  public get userEmail(): string {
    return this.localStorage.get<string>('userEmail').replace(/"/g, '');
  }

  private roleSubject = new BehaviorSubject<string>('');

  public role$ = this.roleSubject.asObservable();

  public isCurrentRole(roleToCheck: string): boolean {
    return this._role === roleToCheck ? true : false;
  }
  public getUserRoles(userID: string | undefined): Observable<any> {
    return this.http.get(`${SERVER_URL}/roles/${userID}`).pipe(
      take(1),
      catchError((err) => {
        console.error(err);
        return []; // Return empty array if error occurs to redirect to login page
      })
    );
  }

  public login(): void {
    this.auth.loginWithRedirect();
  }
  public logout(): void {
    this.localStorage.set('user', null); // Remove user from local storage
    this.localStorage.set('userRole', null); // Remove user role from local storage
    this.localStorage.set('userEmail', null); // Remove user email from local storage
    this.auth.logout({ returnTo: window.location.origin });
  }

  private handleAuthUser(): void {
    this.auth.user$.pipe(take(1)).subscribe((user: User | null | undefined) => {
      if (user) {
        this._isAuthenticated = true;
        this.getUserRoles(user.sub).subscribe({
          next: (roles: Role[]) => {
            if (roles.length === 0) {
              this._role = 'unknown';
            } else {
              this._role = roles[0].name;
            }
          },
          error: (err: Error) => {
            console.error(err);
            this._role = 'unknown';
          },
          complete: () => {
            this.localStorage.set('user', user);
            this.localStorage.set('userRole', this._role);
            this.localStorage.set('userEmail', user.email);
            this.roleSubject.next(this._role);
          },
        });
      }
      this._isAuthenticated = !!user;
    });
  }
}
