import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemButtonComponent } from './components/system-button/system-button.component';
import { SystemCardComponent } from './components/system-card/system-card.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { ReportTableComponent } from './components/report-table/report-table.component';

@NgModule({
  declarations: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
  ],
  imports: [CommonModule],
  exports: [
    SystemButtonComponent,
    SystemCardComponent,
    CardsListComponent,
    ReportTableComponent,
  ],
})
export class SharedModule {}
