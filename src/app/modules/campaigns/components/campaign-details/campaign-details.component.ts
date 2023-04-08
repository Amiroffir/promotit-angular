import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
@Component({
  selector: 'campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.less'],
})
export class CampaignDetailsComponent {
  public role: string = '';
  constructor(private auth: Auth0Service) {
    this.role = this.auth.role;
  }
  @Input() campaign$: Observable<ICampaign> | null = null;
}
