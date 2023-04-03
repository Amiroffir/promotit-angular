import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'system-card',
  templateUrl: './system-card.component.html',
  styleUrls: ['./system-card.component.less'],
})
export class SystemCardComponent {
  constructor() {}
  @Input() id: string = '';
  @Input() userRole: string = '';
  @Input() title: string = '';
  @Input() url: string = '';
  @Input() imgUrl: string = '';

  @Output() cardButtonClicked: EventEmitter<string> =
    new EventEmitter<string>();
  // Or you can use this way
  // @Input() system:Object = {'id':'','userRole':'','title':'','url':'','imgUrl':''};

  public onCardButtonClicked(id: string): void {
    this.cardButtonClicked.emit(this.id);
  }
}
