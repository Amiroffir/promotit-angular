import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonProfitDashboard } from './pages/non-profit-dashboard/non-profit-dashboard.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyCampaignsPage } from './pages/my-campaigns/my-campaigns.page';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { AddCampaignComponent } from '../campaigns/components/add-campaign/add-campaign.component';

const routes: Routes = [
  { path: '', component: NonProfitDashboard },
  { path: 'my-campaigns', component: MyCampaignsPage },
  { path: 'add-campaign', component: AddCampaignComponent },
];

@NgModule({
  declarations: [NonProfitDashboard, MyCampaignsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CampaignsModule,
  ],
  exports: [RouterModule, NonProfitDashboard],
  providers: [],
})
export class NonProfitModule {}
