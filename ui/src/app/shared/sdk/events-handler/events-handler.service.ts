import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { SDKSubscriptionsHandler } from '../subscriptions-handler/subscriptions-handler.directive';
import { SDKEventsHandlerEvent, SDKEventsHandlerEventType } from './events-handler.types';

@Injectable({
  providedIn: 'root',
})
export class SDKEventsHandlerService extends SDKSubscriptionsHandler {
  private emitter = new ReplaySubject<SDKEventsHandlerEvent>(1);
  public emitter$ = this.emitter.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();

    // NOTE: Let the implementation debounce
    this.newSubscription = fromEvent(this.document, 'focusin').subscribe((event) => {
      this.emitter.next({
        type: SDKEventsHandlerEventType.FocusIn,
        event,
      });
    });

    // NOTE: Let the implementation debounce
    this.newSubscription = fromEvent(this.document, 'focusout').subscribe((event) => {
      this.emitter.next({
        type: SDKEventsHandlerEventType.FocusOut,
        event,
      });
    });

    // NOTE: Let the implementation debounce
    this.newSubscription = fromEvent(this.document, 'click').subscribe((event) => {
      this.emitter.next({
        type: SDKEventsHandlerEventType.DocumentClick,
        event,
      });
    });

    // NOTE: Let the implementation debounce
    this.newSubscription = fromEvent(window, 'resize').subscribe((event) => {
      this.emitter.next({
        type: SDKEventsHandlerEventType.WindowResize,
        event,
      });
    });

    // NOTE: Let the implementation debounce
    this.newSubscription = fromEvent(window, 'scroll').subscribe((event) => {
      this.emitter.next({
        type: SDKEventsHandlerEventType.WindowScroll,
        event,
      });
    });
  }
}