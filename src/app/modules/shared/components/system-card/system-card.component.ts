import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Roles } from 'src/app/constants/roles.enum';

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
  @Input() cardType: string = ''; // Will be used to determine if product/campaign
  @Input() cardDetails: any = null;

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: number): void {
    if (this.cardDetails) {
      this.cardButtonClicked.emit(id.toString());
    }
  }

  public get isCampaign(): boolean {
    return this.cardType === 'campaign';
  }
  public get isProduct(): boolean {
    return this.cardType === 'product';
  }
  public get isBusiness(): boolean {
    return this.userRole === Roles.BusinessRep;
  }
  public get isSocialActivist(): boolean {
    return this.userRole === Roles.SocialActivist;
  }
}
