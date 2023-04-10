import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';

@Component({
  selector: 'filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.less'],
})
export class FilterAndSortComponent implements OnInit {
  public selectedOption: string = '';
  public searchText: string = '';
  private _filtered: boolean = false;
  public options: string[] = [];
  public ReportTypes = ReportTypes;
  constructor() {}

  @Input() reportType: string = '';

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  public onSelectionChange(): void {
    this._filtered = this.selectedOption !== '' ? true : false;
    this.selectionChange.emit(this.selectedOption);
  }
  public onSearch(): void {
    this.searchTextChange.emit(this.searchText);
  }

  public get isFiltered(): boolean {
    return this._filtered;
  }
  public ngOnInit(): void {
    this.onSearch(); // To clear the search text
    switch (this.reportType) {
      case ReportTypes.UserReport:
        this.options = ['BusinessRep', 'SocialActivist', 'NonProfitRep'];
        break;
      case ReportTypes.TweetsReport:
        this.options = ['Campaign', 'Activist&Campaign', 'Activist'];
        break;
      default:
        break;
    }
  }

  public get isFilterable(): boolean {
    if (
      this.reportType === ReportTypes.DeliveriesReport ||
      this.reportType === ReportTypes.CampaignsReport ||
      this.reportType === ReportTypes.MyCampaignsReport
    ) {
      return false;
    }
    return true;
  }
}
