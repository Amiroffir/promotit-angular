import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Roles } from 'src/app/constants/roles.enum';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';

@Component({
  selector: 'filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.less'],
})
export class FilterAndSortComponent implements OnInit {
  public selectedOption: string = '';
  public options: string[] = [];
  constructor() {}

  @Input() reportType: string = '';

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();

  public onSelectionChange(): void {
    this.selectionChange.emit(this.selectedOption);
  }
  public ngOnInit(): void {
    switch (this.reportType) {
      case ReportTypes.CampaignsReport:
      case ReportTypes.MyCampaignsReport:
        this.options = ['Campaign Name', 'Campaign Hash', 'By', 'Website'];
        break;
      case ReportTypes.UserReport:
        this.options = ['BusinessRep', 'SocialActivist', 'NonProfitRep'];
        break;
      case ReportTypes.TweetsReport:
        this.options = ['Handle', 'Type', 'Tweets Count'];
        break;
      case ReportTypes.DeliveriesReport:
        this.options = ['Product ID', 'Full Name'];
        break;
      default:
        break;
    }
  }
}
