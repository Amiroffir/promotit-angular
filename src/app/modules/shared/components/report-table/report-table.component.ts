import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
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

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.less'],
})
export class ReportTableComponent {
  public reportTemplate: IReportItem[] = [];
  constructor() {}

  @Input() data$: Observable<ICampaign[]> | null = null;
  @Input() type: string = '';

  @Output() deleteCampaign: EventEmitter<number> = new EventEmitter<number>();
  @Output() editCampaign: EventEmitter<ICampaign> =
    new EventEmitter<ICampaign>();

  public onDeleteCampaign(id: number): void {
    this.deleteCampaign.emit(id);
  }
  public onEditCampaign(campaign: ICampaign): void {
    this.editCampaign.emit(campaign);
  }

  public ngOnInit(): void {
    console.log(this.type);
    if (this.type === 'Campaigns') {
      this.reportTemplate = campaignReportTemplate;
    }
    if (this.type === 'My Campaigns') {
      this.reportTemplate = campaignReportTemplate;
    }
  }
}
