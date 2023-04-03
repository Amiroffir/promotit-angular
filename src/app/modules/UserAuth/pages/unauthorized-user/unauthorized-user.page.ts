import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../services/auth0.service';

@Component({
  selector: 'unauthorized-user',
  templateUrl: './unauthorized-user.page.html',
  styleUrls: ['./unauthorized-user.page.less'],
})
export class UnauthorizedUserComponent {
  constructor(private auth: Auth0Service, private router: Router) {
    this.isauth = auth.isAuthenticated;
  }
  public isauth: boolean;
  public onLoginClick(): void {
    this.auth.login();
  }
}
