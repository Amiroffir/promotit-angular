import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthModule } from './modules/UserAuth/user-auth.module';
import { AppRoutes } from './constants/route.constants';
import { AdminAuthGuard } from './modules/admin/guards/admin-auth.guard';
import { BusinessAuthGuard } from './modules/business-owner/guards/business-auth.guard';
import { NonProfitAuthGuard } from './modules/non-profit/guards/non-profit-auth.guard';
import { SocialActAuthGuard } from './modules/social-activist/guards/social-act-auth.guard';
import { LoadingComponent } from './components/loading/loading.component';
import { AboutPage, ContactUsPage } from './components/componentsIndex';
import {
  ThankYouComponent,
  UnauthorizedUserComponent,
  UserNavigatorComponent,
} from './modules/UserAuth/components/componentsIndex';

const routes: Routes = [
  { path: 'about', component: AboutPage },
  { path: 'contact-us', component: ContactUsPage },
  { path: AppRoutes.unauthorized, component: UnauthorizedUserComponent },
  { path: AppRoutes.thankYou, component: ThankYouComponent },
  { path: AppRoutes.getRole, component: LoadingComponent },
  {
    path: AppRoutes.admin,
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path: AppRoutes.nonProfit,
    loadChildren: () =>
      import('./modules/non-profit/non-profit.module').then(
        (m) => m.NonProfitModule
      ),
    canActivate: [NonProfitAuthGuard],
  },
  {
    path: AppRoutes.socialActivist,
    loadChildren: () =>
      import('./modules/social-activist/social-activist.module').then(
        (m) => m.SocialActivistModule
      ),
    canActivate: [SocialActAuthGuard],
  },
  {
    path: AppRoutes.businessOwner,
    loadChildren: () =>
      import('./modules/business-owner/business-owner.module').then(
        (m) => m.BusinessOwnerModule
      ),
    canActivate: [BusinessAuthGuard],
  },
  {
    path: AppRoutes.userNavigator,
    component: UserNavigatorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserAuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
