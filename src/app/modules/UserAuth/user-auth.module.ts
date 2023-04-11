import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  UnauthorizedUserComponent,
  UserNavigatorComponent,
  ThankYouComponent,
} from './components/componentsIndex';
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
    RouterModule,
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
