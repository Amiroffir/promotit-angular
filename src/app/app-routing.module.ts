import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { AdminAuthGuard } from './modules/admin/guards/admin-auth.guard';
import { BusinessAuthGuard } from './modules/business-owner/guards/business-auth.guard';
import { NonProfitAuthGuard } from './modules/non-profit/guards/non-profit-auth.guard';
import { SocialActAuthGuard } from './modules/social-activist/guards/social-act-auth.guard';
import { ThankYouComponent } from './modules/UserAuth/components/thank-you/thank-you.component';
import { UserNavigatorComponent } from './modules/UserAuth/components/user-navigator/user-navigator.component';
import { UnauthorizedUserComponent } from './modules/UserAuth/pages/unauthorized-user/unauthorized-user.page';
import { UserAuthModule } from './modules/UserAuth/user-auth.module';

const routes: Routes = [
  { path: '', component: UserNavigatorComponent, pathMatch: 'full' },
  // { path: 'about', component: ToImplement },
  // {path: 'contact-us', component: ToImplement},
  { path: 'unauthorized', component: UnauthorizedUserComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'get-role', component: LoadingComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'non-profit',
    loadChildren: () =>
      import('./modules/non-profit/non-profit.module').then(
        (m) => m.NonProfitModule
      ),
    canActivate: [NonProfitAuthGuard],
  },
  {
    path: 'social-activist',
    loadChildren: () =>
      import('./modules/social-activist/social-activist.module').then(
        (m) => m.SocialActivistModule
      ),
    canActivate: [SocialActAuthGuard],
  },
  {
    path: 'business-owner',
    loadChildren: () =>
      import('./modules/business-owner/business-owner.module').then(
        (m) => m.BusinessOwnerModule
      ),
    canActivate: [BusinessAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserAuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
