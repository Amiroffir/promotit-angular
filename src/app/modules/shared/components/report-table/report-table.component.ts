import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ReportTypes } from 'src/app/modules/admin/enums/reportTypes.enum';
import { ICampaign } from '../../../campaigns/models/campaign.model';
import {
  IReportItem,
  campaignReportTemplate,
  userReportTemplate,
  tweetReportTemplate,
  deliveryReportTemplate,
} from '../../constants/report-types.enum';

// NEED TO IMLEMENT SORTING AND FILTERING //

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.less'],
})
export class ReportTableComponent {
  public reportTemplate: IReportItem[] = [];
  public selectedOption: string = '';
  public propertyToFilterBy: string = '';
  constructor() {}

  @Input() data$: Observable<any> | null = null; // The observable is of type any because it can be either an array of ICampaigns or an array of ISystemUsers or an array of ITweets
  @Input() type: string = '';

  @Output() deleteCampaign: EventEmitter<number> = new EventEmitter<number>();
  @Output() editCampaign: EventEmitter<ICampaign> =
    new EventEmitter<ICampaign>();
  @Output() deliveredClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() userDetailsClicked: EventEmitter<number> =
    new EventEmitter<number>();

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
    console.log('selected', selected);
    this.selectedOption = selected;
  }

  public ngOnInit(): void {
    switch (this.type) {
      case ReportTypes.CampaignsReport:
      case ReportTypes.MyCampaignsReport:
        this.reportTemplate = campaignReportTemplate;
        break;
      case ReportTypes.UserReport:
        this.reportTemplate = userReportTemplate;
        this.propertyToFilterBy = 'userType';
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
}
