import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDashboard } from './pages/business-dashboard/business-dashboard.page';
import { RouterModule, Routes } from '@angular/router';
import { BusinessAuthGuard } from './guards/business-auth.guard';
import { CardsListComponent } from '../shared/components/cards-list/cards-list.component';
import { SharedModule } from '../shared/shared.module';
import { ChosenCampaignPage } from '../campaigns/pages/chosen-campaign/chosen-campaign.component';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { PendingDeliveriesPage } from './pages/pending-deliveries/pending-deliveries.page';

const routes: Routes = [
  { path: '', component: BusinessDashboard },
  {
    path: 'business-owner/:id',
    component: ChosenCampaignPage,
    canActivate: [BusinessAuthGuard],
  },
  {
    path: 'pending-deliveries',
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
