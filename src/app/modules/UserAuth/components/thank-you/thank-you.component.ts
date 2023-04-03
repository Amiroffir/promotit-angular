import { Component } from '@angular/core';
import { Auth0Service } from '../../services/auth0.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.less'],
})
export class ThankYouComponent {
  constructor(private auth: Auth0Service) {}

  public logout() {
    this.auth.logout();
  }
}
