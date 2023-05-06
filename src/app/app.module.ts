import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InputTextModule } from 'primeng/inputtext';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
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
import { BaseManager } from './components/base-manager/base-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoadingComponent,
    AboutPage,
    ContactUsPage,
    BaseManager,
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
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
