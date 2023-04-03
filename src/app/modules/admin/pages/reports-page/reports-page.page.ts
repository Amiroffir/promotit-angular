import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.page.html',
  styleUrls: ['./reports-page.page.less'],
})
export class ReportsPage {
  constructor(private route: ActivatedRoute) {}

  public reportType: string = '';

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reportType = params['reportType'];
    });
  }
}
