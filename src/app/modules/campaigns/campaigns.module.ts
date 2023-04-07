import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChosenCampaignPage } from './pages/chosen-campaign/chosen-campaign.component';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { AddCampaignComponent } from './components/add-campaign/add-campaign.component';
import { SharedModule } from '../shared/shared.module';
import { EditCampaignDialog } from './components/edit-campaign-dialog/edit-campaign-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    ChosenCampaignPage,
    CampaignDetailsComponent,
    AddCampaignComponent,
    EditCampaignDialog,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ProductsModule,
  ],
  exports: [ChosenCampaignPage, AddCampaignComponent],
})
export class CampaignsModule {}
