import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-stroage.service';
const cardItems: any[] = [
  {
    id: '1',
    title: 'System 1',
    url: 'https://www.google.com',
    imgUrl:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  },
  {
    id: '2',
    title: 'System 2',
    url: 'https://www.google.com',
    imgUrl:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  },
  {
    id: '3',
    title: 'System 3',
    url: 'https://www.google.com',
    imgUrl:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  },
  {
    id: '4',
    title: 'System 4',
    url: 'https://www.google.com',
    imgUrl:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  },
];

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
  @Input() cardItems: any[] = cardItems;

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();

  public onCardButtonClicked(id: string): void {
    console.log('id: ', id);
    this.cardButtonClicked.emit(id);
  }

  ngOnInit(): void {}
}
