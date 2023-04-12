import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AppRoutes } from 'src/app/constants/route.constants';
import { Auth0Service } from '../../services/auth0.service';

@Component({
  selector: 'unauthorized-user',
  templateUrl: './unauthorized-user.page.html',
  styleUrls: ['./unauthorized-user.page.less'],
})
export class UnauthorizedUserComponent {
  public routes = AppRoutes;
  public isauth: boolean;

  constructor(private auth: Auth0Service, private router: Router) {
    this.isauth = auth.isAuthenticated;
  }

  public onLoginClick(): void {
    this.auth.login();
  }
}
