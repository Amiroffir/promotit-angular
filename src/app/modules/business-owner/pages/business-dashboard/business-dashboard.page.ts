import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';

@Component({
  selector: 'business-dashboard',
  templateUrl: './business-dashboard.page.html',
  styleUrls: ['./business-dashboard.page.less'],
})
export class BusinessDashboard {
  constructor(private auth: Auth0Service, private router: Router) {}

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`/business-owner/${id}`]);
  }

  public logout(): void {
    this.auth.logout();
  }
}
