export class Notification {
  constructor(
    public id: number,
    public type: NotificationType,
    public message: string,
    public timeout: number,
  ) { }
}

export enum NotificationType {
  Success = 0,
  Warning = 1,
  Error = 2,
  Info = 3
}

export const NotificationText = {
  [NotificationType.Success]: 'success',
  [NotificationType.Warning]: 'warning',
  [NotificationType.Error]: 'error',
  [NotificationType.Info]: 'error'
}