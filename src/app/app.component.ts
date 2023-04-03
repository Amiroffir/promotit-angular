import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from './modules/UserAuth/services/auth0.service';

@Component({
  selector: 'promotit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth0Service) {}
  public ngOnInit(): void {}
  public logout(): void {
    this.auth.logout();
  }
}
