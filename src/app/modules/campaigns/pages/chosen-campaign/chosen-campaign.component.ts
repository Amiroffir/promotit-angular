import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'chosen-campaign',
  templateUrl: './chosen-campaign.page.html',
  styleUrls: ['./chosen-campaign.page.less'],
})
export class ChosenCampaignPage implements OnInit {
  constructor(private route: ActivatedRoute) {
    this.campaignId = this.route.snapshot.params['id'];
    console.log('campaignId: ' + this.campaignId);
  }
  public campaignId: string = '';
  public ngOnInit(): void {
    // Probably call a service to get the campaign details here.
  }
}
