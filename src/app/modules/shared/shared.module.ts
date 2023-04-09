import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CardsListComponent,
  FilterAndSortComponent,
  ReportTableComponent,
  SystemButtonComponent,
  SystemCardComponent,
} from './components/componentsIndex';
import { FilterByPropertyPipe } from './pipes/filter-by-property.pipe';

@NgModule({
  declarations: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
    FilterAndSortComponent,
    FilterByPropertyPipe,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
  ],
})
export class SharedModule {}
