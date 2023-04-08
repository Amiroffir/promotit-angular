import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ISystemUser } from 'src/app/modules/admin/models/user.model';
import { ICampaign } from '../../../campaigns/models/campaign.model';

// NEED TO IMLEMENT SORTING AND FILTERING //

interface IReportItem {
  header: string;
  content: string;
}
const campaignReportTemplate: IReportItem[] = [
  {
    header: 'Campaign Name',
    content: 'campaignName',
  },
  {
    header: 'Campaign Hash',
    content: 'campaignHash',
  },
  {
    header: 'By',
    content: 'nonProfitRepID',
  },
  {
    header: 'Website',
    content: 'campaignUrl',
  },
];

const userReportTemplate: IReportItem[] = [
  {
    header: 'User Type',
    content: 'userType',
  },
  {
    header: 'Full Name',
    content: 'fullName',
  },
  {
    header: 'Email',
    content: 'email',
  },
];

const tweetReportTemplate: IReportItem[] = [
  {
    header: 'Handle',
    content: 'handle',
  },
  {
    header: 'Type',
    content: 'type',
  },
  {
    header: 'Tweets Count',
    content: 'tweetsCount',
  },
];

const deliveryReportTemplate: IReportItem[] = [
  {
    header: 'Product ID',
    content: 'pid',
  },
  {
    header: 'Full Name',
    content: 'fullName',
  },
  {
    header: 'Email',
    content: 'email',
  },
  {
    header: 'Address',
    content: 'address',
  },
  {
    header: 'Phone',
    content: 'phone',
  },
];

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.less'],
})
export class ReportTableComponent {
  public reportTemplate: IReportItem[] = [];
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

  public ngOnInit(): void {
    if (this.type === 'Campaigns' || this.type === 'My Campaigns') {
      this.reportTemplate = campaignReportTemplate;
    }
    if (this.type === 'Users') {
      this.reportTemplate = userReportTemplate;
    }
    if (this.type === 'Tweets') {
      this.reportTemplate = tweetReportTemplate;
    }
    if (this.type === 'Deliveries') {
      this.reportTemplate = deliveryReportTemplate;
    }
  }
}
