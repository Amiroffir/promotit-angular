import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { ReportTypes } from '../../enums/reportTypes.enum';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.less'],
})
export class AdminDashboard implements OnInit {
  constructor(private auth: Auth0Service) {}

  public reportTypes = ReportTypes;

  public ngOnInit(): void {
    console.log('it returns to the admin dashboard');
  }
  public logout(): void {
    this.auth.logout();
  }
}
