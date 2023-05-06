import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminRoutes } from './enums/adminRoutes.enum';
import { UserDetailsDialog } from './components/user-details-dialog/user-details-dialog.component';
import { AdminDashboard, ReportsPage } from './pages/pagesIndex';

const routes: Routes = [
  { path: AdminRoutes.adminDashboard, component: AdminDashboard },
  {
    path: AdminRoutes.reportPageByType,
    component: ReportsPage,
    canActivate: [AdminAuthGuard],
  },
];
@NgModule({
  declarations: [AdminDashboard, ReportsPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDialogModule,
    MatListModule,
    UserDetailsDialog,
  ],
  exports: [RouterModule, AdminDashboard],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
