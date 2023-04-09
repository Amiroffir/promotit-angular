import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  SidebarComponent,
  LoadingComponent,
  ContactUsPage,
  AboutPage,
} from './components/componentsIndex';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AdminModule,
  BusinessOwnerModule,
  SocialActivistModule,
  NonProfitModule,
  UserAuthModule,
} from './modules/modulesIndex';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoadingComponent,
    AboutPage,
    ContactUsPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserAuthModule,
    AdminModule,
    BusinessOwnerModule,
    SocialActivistModule,
    NonProfitModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
