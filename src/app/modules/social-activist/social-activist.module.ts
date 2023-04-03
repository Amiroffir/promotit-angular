import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialActDashboard } from './pages/social-act-dashboard/social-act-dashboard.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { ChosenCampaignPage } from '../campaigns/pages/chosen-campaign/chosen-campaign.component';
import { SocialRoutes } from './enums/socialRoutes.enum';
import { SocialActAuthGuard } from './guards/social-act-auth.guard';

const routes: Routes = [
  { path: SocialRoutes.socialActivistDashboard, component: SocialActDashboard },
  {
    path: SocialRoutes.chosenCampaignPage,
    component: ChosenCampaignPage,
    canActivate: [SocialActAuthGuard],
  },
];
@NgModule({
  declarations: [SocialActDashboard],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CampaignsModule,
  ],
  exports: [RouterModule, SocialActDashboard],
  providers: [],
})
export class SocialActivistModule {}
