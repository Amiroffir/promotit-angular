import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      this.auth.role$.subscribe((role) => {
        switch (role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Business Rep':
            this.router.navigate(['/business-owner']);
            break;
          case 'Non Profit Rep':
            this.router.navigate(['/non-profit']);
            break;
          case 'Social Activist':
            this.router.navigate(['/social-activist']);
            break;
          case 'unknown':
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
