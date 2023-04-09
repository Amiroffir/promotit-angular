import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { SharedModule } from '../shared/shared.module';
import { BusinessAuthGuard } from './guards/business-auth.guard';
import { ChosenCampaignPage } from '../campaigns/pages/chosen-campaign/chosen-campaign.component';
import { BusinessDashboard, PendingDeliveriesPage } from './pages/pagesIndex';
import { BusinessRoutes } from './enums/businessRoutes.enum';

const routes: Routes = [
  { path: BusinessRoutes.businessDashboard, component: BusinessDashboard },
  {
    path: BusinessRoutes.chosenCampaignPage,
    component: ChosenCampaignPage,
    canActivate: [BusinessAuthGuard],
  },
  {
    path: BusinessRoutes.pendingDeliveriesPage,
    component: PendingDeliveriesPage,
    canActivate: [BusinessAuthGuard],
  },
];

@NgModule({
  declarations: [BusinessDashboard, PendingDeliveriesPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CampaignsModule,
  ],
  exports: [RouterModule, BusinessDashboard],
  providers: [BusinessAuthGuard],
})
export class BusinessOwnerModule {}
