import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { NotificationService } from '@services/notification.service';
import { Subscription } from 'rxjs';
import { Notification, NotificationText } from './notification.types';

@Component({
  selector: 'qz-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationComponent implements OnInit {
  public notifications: Notification[] = [];
  private subscription: Subscription;
  public notificationBgStyle: {[key: number]: string} = NotificationText;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public close(notification: Notification) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
    this.cdr.markForCheck();
  }

  private addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }

    this.cdr.markForCheck();
  }

  private initSubscriptions(): void {
    this.subscription =
      this.notificationService
        .getObservable()
        .subscribe(notification => this.addNotification(notification));
  }
}
