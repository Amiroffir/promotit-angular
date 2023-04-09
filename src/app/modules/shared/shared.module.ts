import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CardsListComponent,
  ReportTableComponent,
  SystemButtonComponent,
  SystemCardComponent,
} from './components/componentsIndex';

@NgModule({
  declarations: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
  ],
  imports: [CommonModule, MatSnackBarModule],
  exports: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
  ],
})
export class SharedModule {}
