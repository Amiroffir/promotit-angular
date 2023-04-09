import { Component, Input } from '@angular/core';

@Component({
  selector: 'system-button',
  templateUrl: './system-button.component.html',
  styleUrls: ['./system-button.component.less'],
})
export class SystemButtonComponent {
  @Input() public text: string = '';

  constructor() {}
}
