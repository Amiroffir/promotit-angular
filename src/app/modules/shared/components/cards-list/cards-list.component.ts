import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ICampaign } from 'src/app/modules/campaigns/models/campaign.model';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.less'],
})
export class CardsListComponent implements OnInit {
  constructor(private localStorage: LocalStorageService) {
    let roleWithApostrophes: string = this.localStorage.get('userRole');
    this.userRole = roleWithApostrophes.replace(/['"]+/g, '');
  }
  public userRole: string = '';
  @Input() cardItems$: Observable<ICampaign[]> = from([]);
  @Input() cardType: string = '';

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: string): void {
    console.log('id: ', id);
    this.cardButtonClicked.emit(id);
  }

  ngOnInit(): void {}
}
