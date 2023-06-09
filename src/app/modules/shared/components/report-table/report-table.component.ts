import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { ICampaign } from '../../../campaigns/models/campaign.model';
import { SortDirection } from '../../constants/sort.enum';
import {
  IReportItem,
  campaignReportTemplate,
  userReportTemplate,
  tweetReportTemplate,
  deliveryReportTemplate,
  DataObservable,
} from '../../constants/report-types.enum';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.less'],
})
export class ReportTableComponent {
  public reportTemplate: IReportItem[] = [];
  public selectedOption: string = '';
  public propertyToFilterBy: string | undefined = '';
  public sortDirection: string = SortDirection.Ascending;
  public sortProperty: string = '';

  constructor() {}

  @Input() data$: DataObservable | null = null;
  @Input() type: string = '';

  @Output() deleteCampaign: EventEmitter<number> = new EventEmitter<number>();
  @Output() editCampaign: EventEmitter<ICampaign> =
    new EventEmitter<ICampaign>();
  @Output() deliveredClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() userDetailsClicked: EventEmitter<number> =
    new EventEmitter<number>();

  public ngOnInit(): void {
    switch (this.type) {
      case ReportTypes.CampaignsReport:
      case ReportTypes.MyCampaignsReport:
        this.reportTemplate = campaignReportTemplate;
        break;
      case ReportTypes.UserReport:
        this.reportTemplate = userReportTemplate;
        break;
      case ReportTypes.TweetsReport:
        this.reportTemplate = tweetReportTemplate;
        break;
      case ReportTypes.DeliveriesReport:
        this.reportTemplate = deliveryReportTemplate;
        break;
      default:
        break;
    }
  }

  public onDeleteCampaign(id: number): void {
    this.deleteCampaign.emit(id);
  }
  public onEditCampaign(campaign: ICampaign): void {
    this.editCampaign.emit(campaign);
  }
  public onDelivered(serialNumber: number) {
    this.deliveredClicked.emit(serialNumber);
  }
  public onShowUserDetails(userID: number): void {
    this.userDetailsClicked.emit(userID);
  }
  public onSelectionChange(selected: string): void {
    this.selectedOption = selected;
    this.filterDecider(this.type);
  }
  public onSearch(searchText: string): void {
    this.selectedOption = searchText;
    this.propertyToFilterBy = '';
  }

  public onSort(sortBy: string): void {
    this.sortProperty = sortBy;
    this.sortDirection =
      this.sortDirection === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending;
  }

  public get isCampaignsReport(): boolean {
    return this.type === ReportTypes.CampaignsReport;
  }
  public get isMyCampaignsReport(): boolean {
    return this.type === ReportTypes.MyCampaignsReport;
  }
  public get isUsersReport(): boolean {
    return this.type === ReportTypes.UserReport;
  }
  public get isTweetsReport(): boolean {
    return this.type === ReportTypes.TweetsReport;
  }
  public get isDeliveriesReport(): boolean {
    return this.type === ReportTypes.DeliveriesReport;
  }

  private filterDecider(type: string): void {
    switch (type) {
      case ReportTypes.UserReport:
        this.propertyToFilterBy = 'userType';
        break;
      case ReportTypes.TweetsReport:
        this.propertyToFilterBy = 'type';
        break;
      default:
        break;
    }
  }
}
