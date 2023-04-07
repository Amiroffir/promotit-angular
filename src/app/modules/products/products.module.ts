import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDonationComponent } from './components/products-donation/products-donation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsDonationComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductsDonationComponent],
})
export class ProductsModule {}
