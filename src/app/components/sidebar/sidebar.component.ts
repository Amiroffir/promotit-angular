import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { sidebarItems } from 'src/app/constants/route.constants';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  constructor(private auth: Auth0Service) {
    this.sidebarItems = sidebarItems;
  }
  public role$: Observable<string> = this.auth.role$;
  public sidebarItems: any;

  public logout() {
    this.auth.logout();
  }
}
