import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { IProduct } from 'src/app/modules/products/models/product.model';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';
import { ObservableCardItems } from '../../constants/report-types.enum';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.less'],
})
export class CardsListComponent {
  public userRole: string = '';

  constructor(private auth: Auth0Service) {
    this.userRole = this.auth.role;
  }

  @Input() cardItems$: ObservableCardItems | null = from([]);

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: string): void {
    this.cardButtonClicked.emit(id);
  }
}
