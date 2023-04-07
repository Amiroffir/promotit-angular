import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { AdminAuthGuard } from './modules/admin/guards/admin-auth.guard';

import { UserAuthModule } from './modules/UserAuth/user-auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BusinessOwnerModule } from './modules/business-owner/business-owner.module';
import { SocialActivistModule } from './modules/social-activist/social-activist.module';
import { NonProfitModule } from './modules/non-profit/non-profit.module';
import { LoadingComponent } from './components/loading/loading.component';
import { SystemButtonComponent } from './modules/shared/components/system-button/system-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletComponent } from './modules/social-activist/components/wallet/wallet.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserAuthModule,
    AdminModule,
    BusinessOwnerModule,
    SocialActivistModule,
    NonProfitModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
