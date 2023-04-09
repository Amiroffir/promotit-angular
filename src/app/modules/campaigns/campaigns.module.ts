import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';
import { SharedModule } from '../shared/shared.module';
import {
  AddCampaignComponent,
  CampaignDetailsComponent,
  ChosenCampaignPage,
  EditCampaignDialog,
} from './components/componentsIndex';

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
