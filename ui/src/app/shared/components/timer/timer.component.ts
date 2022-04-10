import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import {
  scan,
  Subject,
  Subscription,
  takeUntil,
  takeWhile,
  timer
} from 'rxjs';

@Component({
  selector: 'qz-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimerComponent implements OnInit {
  @Input() duration: number = 30;
  @Input() reset = new Subject<void>();
  @Input() class: string;

  @Output() timeEnd = new EventEmitter<boolean>();

  public _timer = new Subject<boolean>();
  public timer$: Subscription = new Subscription();
  public currentTime: number;
  private stopTimer = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.setTimer();

    this.reset.subscribe(() => {
      this.stopTimer.next();
      this.setTimer();
    })
  }

  private setTimer() {
    this.timer$ = timer(0, 1000).pipe(
      scan(acc => --acc, this.duration),
      takeWhile(x => x >= 0),
      takeUntil(this.stopTimer),
    ).subscribe((timeLeft) => {
      this.updateTimeLeft(timeLeft);
      this.currentTime = timeLeft;
      this.cdr.markForCheck();
    });
  }

  private updateTimeLeft(seconds: number) {
    if (seconds === 0) {
      this.timeEnd.emit(true);
    }
  }

}
