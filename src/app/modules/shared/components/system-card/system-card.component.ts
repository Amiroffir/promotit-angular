import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/services/campaigns-data.service';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

interface ICardDetails {
  id: string;
  userRole: string;
  title: string;
  url?: string;
  imgUrl?: string;
}

@Component({
  selector: 'system-card',
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.less'],
})
export class SystemCardComponent {
  constructor() {}
  @Input() id: number = 0;
  @Input() userRole: string = '';
  @Input() cardType: string = ''; // Will be used to determine if product/campaign
  @Input() cardDetails: ICampaign | null = null; //{
  //   id: 0,
  //   campaignName: '',
  //   campaignDesc: '',
  //   campaignHash: ' ',
  //   campaignUrl: '',
  //   donationsAmount: 0,
  //   image: ',',
  //   nonProfitRepID: '',
  // };

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();
  // Or you can use this way
  //

  public onCardButtonClicked(id: number | undefined): void {
    if (this.cardDetails) {
      this.cardButtonClicked.emit(this.cardDetails.id.toString());
    }
  }
}
