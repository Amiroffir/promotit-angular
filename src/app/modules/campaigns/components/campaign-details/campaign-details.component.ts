import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from '../../services/campaigns-data.service';

@Component({
  selector: 'campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.less'],
})
export class CampaignDetailsComponent {
  constructor() {}
  @Input() campaign$: Observable<ICampaign> | null = null;
}
