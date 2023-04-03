import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'social-act-dashboard',
  templateUrl: './social-act-dashboard.page.html',
  styleUrls: ['./social-act-dashboard.page.less'],
})
export class SocialActDashboard {
  constructor(private router: Router) {}

  public onCardButtonClicked(id: string): void {
    this.router.navigate([`/social-activist/${id}`]);
  }
}
