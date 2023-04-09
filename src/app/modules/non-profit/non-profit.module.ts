import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NonProfitAuthGuard } from './guards/non-profit-auth.guard';
import { NonProfitRoutes } from './enums/nonProfitRoutes.enum';
import { AddCampaignComponent } from '../campaigns/components/add-campaign/add-campaign.component';
import { MyCampaignsPage, NonProfitDashboard } from './pages/pagesIndex';

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
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [RouterModule, NonProfitDashboard],
  providers: [],
})
export class NonProfitModule {}
