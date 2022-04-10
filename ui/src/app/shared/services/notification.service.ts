import { Injectable } from '@angular/core';
import { Notification, NotificationType } from '@components/notification/notification.types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _subject = new Subject<Notification>();
  private _idx = 0;

  constructor() { }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Info, message, timeout));
  }

  success(message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Success, message, timeout));
  }

  warning(message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Warning, message, timeout));
  }

  error(message: string, timeout = 0) {
    this._subject.next(new Notification(this._idx++, NotificationType.Error, message, timeout));
  }

}