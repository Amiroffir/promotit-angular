import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Roles } from 'src/app/constants/roles.enum';
import { Auth0Service } from '../../services/auth0.service';

@Component({
  selector: 'user-navigator',
  templateUrl: './user-navigator.component.html',
  styleUrls: ['./user-navigator.component.less'],
})
export class UserNavigatorComponent implements OnInit {
  constructor(private auth: Auth0Service, private router: Router) {}

  public ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.auth.role$.pipe(take(2)).subscribe((role) => {
        // It takes 2 values because of the first value is empty string(Default) and the second value is the actual role
        console.log('role: ', role);
        switch (role) {
          case Roles.Admin:
            this.router.navigate(['/admin']);
            break;
          case Roles.BusinessRep:
            this.router.navigate(['/business-owner']);
            break;
          case Roles.NonProfit:
            this.router.navigate(['/non-profit']);
            break;
          case Roles.SocialActivist:
            this.router.navigate(['/social-activist']);
            break;
          case Roles.Unknown:
            this.router.navigate(['/thank-you']);
            break;
          default:
            this.router.navigate(['/get-role']); // This page will be in empty string case
        }
      });
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
}
