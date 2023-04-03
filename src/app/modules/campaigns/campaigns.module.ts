import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChosenCampaignPage } from './pages/chosen-campaign/chosen-campaign.component';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ChosenCampaignPage,
    CampaignDetailsComponent,
    AddCampaignComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ChosenCampaignPage, AddCampaignComponent],
})
export class CampaignsModule {}
