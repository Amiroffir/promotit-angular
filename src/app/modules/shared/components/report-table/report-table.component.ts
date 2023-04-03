import { Component, Input } from '@angular/core';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.less'],
})
export class ReportTableComponent {
  constructor() {}

  @Input() public data: any;

  ngOnInit(): void {}
}
