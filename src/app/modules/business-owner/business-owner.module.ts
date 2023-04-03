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
import { BusinessRoutes } from './enums/businessRoutes.enum';
import { CampaignsDataService } from '../campaigns/services/campaigns-data.service';

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
