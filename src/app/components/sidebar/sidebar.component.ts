import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { LocalStorageService } from 'src/app/services/local-stroage.service';
import { ISidebarItem } from 'src/app/constants/route.constants';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  constructor(private auth: Auth0Service) {
    //this.role = this.auth.role;
    // console.log(this.role);
  }
  public role$: Observable<string> = this.auth.role$;

  // public sidebarItems: ISidebarItem[] = [
  //   {
  //     name: 'Home',
  //     route: '',
  //   },
  //   {
  //     name: 'About',
  //     route: 'about',
  //   },
  //   {
  //     name: 'Contact us',
  //     route: 'contact-us',
  //   },
  // ];

  public logout() {
    this.auth.logout();
  }
}
