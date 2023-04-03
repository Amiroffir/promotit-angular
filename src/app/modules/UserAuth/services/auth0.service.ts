import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { SERVER_URL } from 'src/app/global-env';
import { AuthService, User } from '@auth0/auth0-angular';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

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
      this._role = localStorage.get<string>('userRole');
    }
  }

  private _isAuthenticated: boolean = false;
  private _role: string = '';
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public get role(): string {
    return this._role;
  }

  private roleSubject = new BehaviorSubject<string>('');

  public role$ = this.roleSubject.asObservable();

  public isCurrentRole(roleToCheck: string): boolean {
    return this._role === roleToCheck ? true : false;
  }

  public getUserRoles(userID: string | undefined): Observable<any> {
    return this.http.get(`${SERVER_URL}/roles/${userID}`);
  }

  public login(): void {
    this.auth.loginWithRedirect();
  }
  public logout(): void {
    this.localStorage.set('user', null); // Remove user from local storage
    this.localStorage.set('userRole', null); // Remove user role from local storage
    this.auth.logout({ returnTo: window.location.origin });
  }

  private handleAuthUser(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.localStorage.set('user', user);
        this._isAuthenticated = true;
        this.getUserRoles(user.sub).subscribe((roles) => {
          if (roles.length === 0) {
            this._role = 'unknown';
            this.localStorage.set('userRole', this._role);
          } else {
            this._role = roles[0].name;
          }
          this.localStorage.set('userRole', this._role);
          this.roleSubject.next(this._role);
        });
      }
      this._isAuthenticated = !!user;
    });
  }
}
