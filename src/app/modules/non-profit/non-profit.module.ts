import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonProfitDashboard } from './pages/non-profit-dashboard/non-profit-dashboard.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyCampaignsPage } from './pages/my-campaigns/my-campaigns.page';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { AddCampaignComponent } from '../campaigns/components/add-campaign/add-campaign.component';
import { NonProfitAuthGuard } from './guards/non-profit-auth.guard';
import { NonProfitRoutes } from './enums/nonProfitRoutes.enum';

const routes: Routes = [
  {
    path: NonProfitRoutes.nonProfitDashboard,
    component: NonProfitDashboard,
    canActivate: [NonProfitAuthGuard],
  },
  {
    path: NonProfitRoutes.myCampaignsPage,
    component: MyCampaignsPage,
    canActivate: [NonProfitAuthGuard],
  },
  {
    path: NonProfitRoutes.addCampaign,
    component: AddCampaignComponent,
    canActivate: [NonProfitAuthGuard],
  },
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
