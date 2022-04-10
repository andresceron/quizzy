import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Manages observable subscriptions and automatically cleans up on class destruction
 */

@Directive()
export class SDKSubscriptionsHandler implements OnDestroy {
  private subscription = new Subscription();

  public set newSubscription(sub: Subscription) {
    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}