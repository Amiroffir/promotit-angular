import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard.page';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { SystemButtonComponent } from 'src/app/modules/shared/components/system-button/system-button.component';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from '../shared/shared.module';
import { ReportsPage } from './pages/reports-page/reports-page.page';
import { AdminRoutes } from './enums/adminRoutes.enum';

const routes: Routes = [
  { path: AdminRoutes.adminDashboard, component: AdminDashboard },
  {
    path: AdminRoutes.reportPageByType,
    component: ReportsPage,
    canActivate: [AdminAuthGuard],
  },
]; //,{path: 'user-report', component:ToImplement},{path: 'campaigns-report', component:ToImplement},{path: 'tweets-report', component:ToImplement}];

@NgModule({
  declarations: [AdminDashboard, ReportsPage],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule, AdminDashboard],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
