import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'base-manager',
  templateUrl: './base-manager.component.html',
  styleUrls: ['./base-manager.component.less'],
})
export class BaseManager implements OnDestroy {
  protected subscriptionsManager: Subscription[] = [];

  public ngOnDestroy(): void {
    this.subscriptionsManager.forEach((subscription: Subscription) => {
      console.log('Unsubscribing from: ', subscription);
      subscription.unsubscribe();
    });
  }
}
