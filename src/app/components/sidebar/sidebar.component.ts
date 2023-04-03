import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  constructor(
    private auth: Auth0Service,
    private localStorage: LocalStorageService
  ) {}

  public role: string = '';

  public logout() {
    this.auth.logout();
  }
}
