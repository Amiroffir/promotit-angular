import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { Auth0Service } from 'src/app/modules/UserAuth/services/auth0.service';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.less'],
})
export class CardsListComponent {
  constructor(private auth: Auth0Service) {
    this.userRole = this.auth.role;
  }
  public userRole: string = '';
  @Input() cardItems$: Observable<ICampaign[] | any> | null = from([]);
  @Input() cardType: string = '';

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: string): void {
    console.log('id: ', id);
    this.cardButtonClicked.emit(id);
  }
}
