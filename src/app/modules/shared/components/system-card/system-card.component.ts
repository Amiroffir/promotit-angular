import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Roles } from 'src/app/constants/roles.enum';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { IProduct } from 'src/app/modules/products/models/product.model';
import { CardDetails } from '../../constants/report-types.enum';

@Component({
  selector: 'system-card',
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.less'],
})
export class SystemCardComponent {
  public Roles = Roles;

  constructor() {}

  @Input() id: number = 0;
  @Input() userRole: string = '';
  @Input() cardDetails: CardDetails = null;

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: number): void {
    if (this.cardDetails) {
      this.cardButtonClicked.emit(id.toString());
    }
  }

  // This functions are type guards and will be used to determine if the cardDetails is a campaign or a product, they return a boolean value of what is being checked
  public isCampaignsGuard(details: CardDetails): details is ICampaign {
    return (details as ICampaign).campaignName !== undefined;
  }
  public isProductsGuard(details: CardDetails): details is IProduct {
    return (details as IProduct).productName !== undefined;
  }

  public get isBusiness(): boolean {
    return this.userRole === Roles.BusinessRep;
  }
  public get isSocialActivist(): boolean {
    return this.userRole === Roles.SocialActivist;
  }
}
