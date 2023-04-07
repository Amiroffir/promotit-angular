import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { IProduct } from 'src/app/modules/products/models/product.model';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

interface ICardDetails {
  cardDetails: ICampaign | IProduct | null;
}

@Component({
  selector: 'system-card',
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.less'],
})
export class SystemCardComponent implements OnInit {
  constructor() {}

  @Input() id: number = 0;
  @Input() userRole: string = '';
  @Input() cardType: string = ''; // Will be used to determine if product/campaign
  @Input() cardDetails: ICampaign | any | null = null;

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() productCardClicked: EventEmitter<Event> = new EventEmitter<Event>();

  public onCardButtonClicked(id: number | undefined): void {
    if (this.cardDetails) {
      this.cardButtonClicked.emit(this.cardDetails.id.toString());
    }
  }

  ngOnInit(): void {
    console.log(' I am in system-card.component.ts ');
  }
}
