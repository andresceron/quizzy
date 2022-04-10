import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'qz-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ErrorMessageComponent {
  @Input() message: string;
  constructor() {}
}
