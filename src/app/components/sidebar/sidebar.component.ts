import { Component } from '@angular/core';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { sidebarItems } from 'src/app/constants/route.constants';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/constants/roles.enum';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  public sidebarItems = sidebarItems;
  public roles = Roles;

  constructor(private auth: Auth0Service) {}
  public role$: Observable<string> = this.auth.role$;

  public logout() {
    this.auth.logout();
  }
}
