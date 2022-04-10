export enum SDKEventsHandlerEventType {
  DocumentClick,
  FocusIn,
  FocusOut,
  WindowResize,
  WindowScroll,
}

export interface SDKEventsHandlerEvent {
  type: SDKEventsHandlerEventType;
  event: Event;
}