import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { UnauthorizedUserComponent } from './pages/unauthorized-user/unauthorized-user.page';
import { HttpClientModule } from '@angular/common/http';
import { UserNavigatorComponent } from './components/user-navigator/user-navigator.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from '../admin/pages/admin-dashboard/admin-dashboard.page';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from 'src/app/global-env';

@NgModule({
  declarations: [
    UnauthorizedUserComponent,
    UserNavigatorComponent,
    ThankYouComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
    }),
  ],
  exports: [
    UnauthorizedUserComponent,
    UserNavigatorComponent,
    ThankYouComponent,
  ],
  providers: [],
})
export class UserAuthModule {}
