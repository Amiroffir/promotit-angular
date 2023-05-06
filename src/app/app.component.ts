import { Component, inject } from '@angular/core';
import { Auth0Service } from './modules/UserAuth/services/auth0.service';

@Component({
  selector: 'promotit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor() {}

  private auth = inject(Auth0Service); // This is another way to inject a service into a component and even a better one because it is not necessary to declare the service in the constructor in case of inheritance
}
